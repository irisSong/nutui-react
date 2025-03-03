import * as fs from 'fs'
import * as path from 'path'
import * as ts from 'typescript'

interface PropType {
  name: string
  desc: string
  type: string | string[]
  default: string
  designName: string
  designValue: string
  bindValue: { [key: string]: string }
}

interface ComponentDef {
  name: string
  props: PropType[]
}

interface PackageDef {
  name: string
  package: string
  components: ComponentDef[]
}

interface ConfigComponent {
  name: string
  cName: string
  type: string
  show: boolean
  desc: string
  author: string
  v15?: boolean
}

interface Config {
  nav: Array<{
    name: string
    packages: ConfigComponent[]
  }>
}

// 存储类型别名的映射
const typeAliasMap = new Map<string, string[]>()

function findTypeAlias(node: ts.Node, sourceFile: ts.SourceFile) {
  if (ts.isTypeAliasDeclaration(node)) {
    const aliasName = node.name.getText(sourceFile)
    const type = node.type

    if (ts.isUnionTypeNode(type)) {
      const values = type.types.map((t) =>
        t.getText(sourceFile).replace(/['"]/g, '')
      )
      typeAliasMap.set(aliasName, values)
    }
  }

  // 处理导入的类型
  if (ts.isImportDeclaration(node)) {
    const importClause = node.importClause
    if (importClause && importClause.namedBindings) {
      if (ts.isNamedImports(importClause.namedBindings)) {
        importClause.namedBindings.elements.forEach((element) => {
          const importedName = element.name.text
          // 尝试查找并加载导入文件中的类型定义
          const moduleSpecifier = node.moduleSpecifier
            .getText(sourceFile)
            .replace(/['"]/g, '')

          if (moduleSpecifier.startsWith('.')) {
            const importedFilePath = path.resolve(
              path.dirname(sourceFile.fileName),
              `${moduleSpecifier}.ts`
            )
            if (fs.existsSync(importedFilePath)) {
              const importedContent = fs.readFileSync(importedFilePath, 'utf-8')
              const importedSourceFile = ts.createSourceFile(
                importedFilePath,
                importedContent,
                ts.ScriptTarget.Latest,
                true
              )
              findTypeAlias(importedSourceFile, importedSourceFile)
            }
          }
        })
      }
    }
  }

  ts.forEachChild(node, (child) => findTypeAlias(child, sourceFile))
}

function normalizeType(
  type: ts.TypeNode,
  sourceFile: ts.SourceFile
): string | string[] {
  if (ts.isUnionTypeNode(type)) {
    return type.types.map((t) => normalizeType(t, sourceFile)).flat()
  }

  const typeText = type.getText(sourceFile)

  // Handle React.ReactNode and ReactNode
  if (typeText.includes('ReactNode')) {
    return 'node'
  }

  // Handle type aliases
  if (ts.isTypeReferenceNode(type)) {
    const typeName = type.typeName.getText(sourceFile)
    if (typeAliasMap.has(typeName)) {
      return typeAliasMap.get(typeName) || []
    }

    // 如果在本地找不到类型定义，尝试在相关文件中查找
    const currentDir = path.dirname(sourceFile.fileName)
    const possibleFiles = [
      path.join(currentDir, 'type.ts'),
      path.join(currentDir, 'types.ts'),
      path.join(currentDir, 'index.ts'),
      path.join(currentDir, `${path.basename(currentDir)}.ts`),
    ]

    for (const file of possibleFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf-8')
        const typeSourceFile = ts.createSourceFile(
          file,
          content,
          ts.ScriptTarget.Latest,
          true
        )
        findTypeAlias(typeSourceFile, typeSourceFile)
        if (typeAliasMap.has(typeName)) {
          return typeAliasMap.get(typeName) || []
        }
      }
    }
  }

  // Handle basic types
  switch (typeText) {
    case 'string':
    case 'number':
    case 'boolean':
      return typeText
    default:
      // Remove quotes from string literals
      return typeText.replace(/['"]/g, '')
  }
}

function isEventProp(member: ts.PropertySignature): boolean {
  // Check if it's an event handler (starts with 'on' and is a function type)
  const name = member.name.getText()
  const isEventName =
    name.startsWith('on') &&
    name.length > 2 &&
    name[2] === name[2].toUpperCase() // Checks if third character is uppercase

  const type = member.type
  if (!type) return false

  const isFunction =
    ts.isFunctionTypeNode(type) ||
    (ts.isTypeReferenceNode(type) && type.getText().includes('Function')) ||
    type.getText().includes('=>')

  return isEventName && isFunction
}

function isEventPropName(name: string): boolean {
  // 检查是否是事件处理器属性名（以 'on' 开头且第三个字符大写）
  return (
    name.startsWith('on') &&
    name.length > 2 &&
    name[2] === name[2].toUpperCase()
  )
}

function extractDefaultProps(
  node: ts.Node,
  sourceFile: ts.SourceFile
): Record<string, string> {
  const defaultValues: Record<string, string> = {}

  function visit(node: ts.Node) {
    // 处理变量声明的 defaultProps
    if (ts.isVariableStatement(node)) {
      const declaration = node.declarationList.declarations[0]
      if (declaration && ts.isIdentifier(declaration.name)) {
        // 检查变量名是否为 defaultProps 或 ComponentDefaults
        if (
          declaration.name.text === 'defaultProps' ||
          declaration.name.text === 'ComponentDefaults'
        ) {
          if (declaration.initializer) {
            if (ts.isObjectLiteralExpression(declaration.initializer)) {
              // 直接的对象字面量
              extractFromObjectLiteral(
                declaration.initializer,
                defaultValues,
                sourceFile
              )
            } else if (ts.isAsExpression(declaration.initializer)) {
              // 处理 as 类型断言的情况
              const expression = declaration.initializer.expression
              if (ts.isObjectLiteralExpression(expression)) {
                extractFromObjectLiteral(expression, defaultValues, sourceFile)
              }
            }
          }
        }
      }
    }

    // 处理属性赋值的 defaultProps
    if (ts.isExpressionStatement(node)) {
      const expression = node.expression
      if (
        ts.isBinaryExpression(expression) &&
        expression.operatorToken.kind === ts.SyntaxKind.EqualsToken
      ) {
        const left = expression.left
        if (ts.isPropertyAccessExpression(left)) {
          const property = left.name
          // 检查是否是组件的 defaultProps 赋值
          if (property.text === 'defaultProps') {
            if (ts.isObjectLiteralExpression(expression.right)) {
              extractFromObjectLiteral(
                expression.right,
                defaultValues,
                sourceFile
              )
            } else if (ts.isAsExpression(expression.right)) {
              // 处理 as 类型断言的情况
              const expr = expression.right.expression
              if (ts.isObjectLiteralExpression(expr)) {
                extractFromObjectLiteral(expr, defaultValues, sourceFile)
              }
            }
          }
        }
      }
    }

    // 处理展开运算符的情况
    if (ts.isSpreadAssignment(node)) {
      const expr = node.expression
      if (ts.isIdentifier(expr)) {
        // 尝试在文件中查找这个标识符的定义
        const typeChecker = ts
          .createProgram([sourceFile.fileName], {})
          .getTypeChecker()
        const symbol = typeChecker.getSymbolAtLocation(expr)
        if (symbol && symbol.declarations) {
          const declaration = symbol.declarations[0]
          if (
            ts.isVariableDeclaration(declaration) &&
            declaration.initializer
          ) {
            if (ts.isObjectLiteralExpression(declaration.initializer)) {
              extractFromObjectLiteral(
                declaration.initializer,
                defaultValues,
                sourceFile
              )
            }
          }
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(node)
  return defaultValues
}

function extractFromObjectLiteral(
  obj: ts.ObjectLiteralExpression,
  defaultValues: Record<string, string>,
  sourceFile: ts.SourceFile
) {
  obj.properties.forEach((prop) => {
    if (ts.isPropertyAssignment(prop)) {
      const propName = prop.name.getText(sourceFile)

      // 跳过事件处理器属性
      if (isEventPropName(propName)) {
        return
      }

      const initializer = prop.initializer

      let defaultValue: string

      // 处理不同类型的值
      if (ts.isStringLiteral(initializer)) {
        // 如果是空字符串，直接使用
        if (initializer.text === '') {
          defaultValue = ''
        } else {
          defaultValue = `${initializer.text}`
        }
      } else if (ts.isNumericLiteral(initializer)) {
        defaultValue = initializer.text
      } else if (initializer.kind === ts.SyntaxKind.TrueKeyword) {
        defaultValue = 'true'
      } else if (initializer.kind === ts.SyntaxKind.FalseKeyword) {
        defaultValue = 'false'
      } else if (initializer.kind === ts.SyntaxKind.NullKeyword) {
        defaultValue = 'null'
      } else if (initializer.kind === ts.SyntaxKind.UndefinedKeyword) {
        defaultValue = '' // undefined 转换为空字符串
      } else if (ts.isArrayLiteralExpression(initializer)) {
        // 空数组处理
        if (initializer.elements.length === 0) {
          defaultValue = '[]'
        } else {
          const elements = initializer.elements.map((e) => {
            if (ts.isStringLiteral(e)) {
              return e.text === '' ? '' : `${e.text}`
            }
            if (ts.isNumericLiteral(e)) {
              return e.text
            }
            if (e.kind === ts.SyntaxKind.TrueKeyword) {
              return 'true'
            }
            if (e.kind === ts.SyntaxKind.FalseKeyword) {
              return 'false'
            }
            if (e.kind === ts.SyntaxKind.NullKeyword) {
              return 'null'
            }
            return e.getText(sourceFile)
          })
          defaultValue = `[${elements.join(', ')}]`
        }
      } else if (ts.isObjectLiteralExpression(initializer)) {
        // 空对象处理
        if (initializer.properties.length === 0) {
          defaultValue = '{}'
        } else {
          const nestedValues: Record<string, string> = {}
          extractFromObjectLiteral(initializer, nestedValues, sourceFile)
          defaultValue = JSON.stringify(nestedValues)
        }
      } else {
        // 其他情况，尝试获取原始文本
        const text = initializer.getText(sourceFile)
        if (text === '""' || text === "''") {
          defaultValue = ''
        } else {
          defaultValue = text
        }
      }

      // 存储默认值
      defaultValues[propName] = defaultValue
      console.log(`Extracted defaultProp: ${propName} = ${defaultValue}`)
    } else if (ts.isSpreadAssignment(prop)) {
      const spreadExpr = prop.expression
      if (ts.isIdentifier(spreadExpr)) {
        // 尝试查找展开的变量定义
        const spreadName = spreadExpr.text
        console.log(`Looking for spread variable: ${spreadName}`)
        // TODO: 实现查找和处理展开变量的逻辑
      }
    }
  })
}

function findDefaultPropsInFile(
  sourceFile: ts.SourceFile
): Record<string, string> {
  let defaultProps: Record<string, string> = {}

  function visit(node: ts.Node) {
    const props = extractDefaultProps(node, sourceFile)
    defaultProps = { ...defaultProps, ...props }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return defaultProps
}

function extractPropsFromFile(filePath: string): ComponentDef | null {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  )

  typeAliasMap.clear()
  findTypeAlias(sourceFile, sourceFile)

  let componentName = ''
  const propsInterface: PropType[] = []

  // 获取默认值
  const defaultProps = null
  //   const defaultProps = findDefaultPropsInFile(sourceFile)
  const componentFileName = path.basename(filePath)
  console.log(`Processing component: ${componentFileName}`)
  console.log('Found defaultProps:', defaultProps)

  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node) && node.name.text.endsWith('Props')) {
      componentName = node.name.text.replace('Props', '')

      node.members.forEach((member: ts.TypeElement) => {
        if (ts.isPropertySignature(member)) {
          const propName = member.name.getText(sourceFile)

          // 跳过 className 和 styles 属性
          if (propName === 'className' || propName === 'styles') {
            return
          }

          // 跳过事件处理器属性
          if (isEventProp(member)) {
            return
          }

          const jsDoc = ts.getJSDocTags(member)
          const description =
            jsDoc
              .find((tag: ts.JSDocTag) => tag.tagName.text === 'description')
              ?.comment?.toString() || ''

          let propType: string | string[] = ''
          if (member.type) {
            propType = normalizeType(member.type, sourceFile)
          }

          // 获取默认值
          const defaultValue = defaultProps?.[propName] || ''

          propsInterface.push({
            name: propName,
            desc: description,
            type: propType,
            default: defaultValue,
            designName: '',
            designValue: '',
            bindValue: {},
          })
        }
      })
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  if (propsInterface.length > 0) {
    const dirName = path.basename(path.dirname(filePath))
    componentName = dirName.charAt(0).toUpperCase() + dirName.slice(1)

    return {
      name: componentName,
      props: propsInterface,
    }
  }

  return null
}

// 读取和解析 config.json，并返回所有标记为 v15: true 的组件名称集合
function getV15Components(): Set<string> {
  const configPath = path.join(__dirname, '../src/config.json')
  const config: Config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

  const v15Components = new Set<string>()

  config.nav.forEach((nav) => {
    nav.packages.forEach((pkg) => {
      if (pkg.v15 === true) {
        // 将组件名转换为小写，以匹配目录名
        v15Components.add(pkg.name.toLowerCase())
      }
    })
  })
  console.log('v15Components.length', v15Components)
  return v15Components
}

function generatePropsJson() {
  const packagesDir = path.join(__dirname, '../src/packages')
  const components: ComponentDef[] = []
  const v15Components = getV15Components()

  // Read all component directories
  fs.readdirSync(packagesDir).forEach((dir: string) => {
    // 只处理 v15 组件
    if (!v15Components.has(dir)) {
      return
    }

    const componentDir = path.join(packagesDir, dir)
    if (fs.statSync(componentDir).isDirectory()) {
      // Look for the main component file
      const componentFile = path.join(componentDir, `${dir}.tsx`)
      if (fs.existsSync(componentFile)) {
        const componentDef = extractPropsFromFile(componentFile)
        if (componentDef) {
          components.push(componentDef)
        }
      }
    }
  })

  const output: PackageDef = {
    name: 'NutUI',
    package: '@nutui/nutui-react-taro',
    components,
  }

  // Write the result to a JSON file
  const outputPath = path.join(__dirname, '../props/props.json')
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2))
}

generatePropsJson()
