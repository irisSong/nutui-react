import * as fs from 'fs'
import * as path from 'path'
import * as ts from 'typescript'

interface PropType {
  name: string
  desc: string
  type: string | string[]
  default?: string
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

// 存储类型别名的映射
const typeAliasMap = new Map<string, string[]>()

function findTypeAlias(node: ts.Node, sourceFile: ts.SourceFile) {
  if (ts.isTypeAliasDeclaration(node)) {
    const aliasName = node.name.getText(sourceFile)
    const type = node.type

    if (ts.isUnionTypeNode(type)) {
      const values = type.types.map((t) => t.getText(sourceFile).replace(/['"]/g, ''))
      typeAliasMap.set(aliasName, values)
    }
  }

  ts.forEachChild(node, (child) => findTypeAlias(child, sourceFile))
}

function normalizeType(type: ts.TypeNode, sourceFile: ts.SourceFile): string | string[] {
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
  const isEventName = name.startsWith('on') && name.length > 2 && 
                     name[2] === name[2].toUpperCase() // Checks if third character is uppercase
  
  const type = member.type
  if (!type) return false

  const isFunction = 
    ts.isFunctionTypeNode(type) || 
    (ts.isTypeReferenceNode(type) && type.getText().includes('Function')) ||
    type.getText().includes('=>')

  return isEventName && isFunction
}

function extractPropsFromFile(filePath: string): ComponentDef | null {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  )

  // 首先扫描并收集所有类型别名
  typeAliasMap.clear() // 清除之前的类型别名
  findTypeAlias(sourceFile, sourceFile)

  let componentName = ''
  let propsInterface: PropType[] = []

  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node) && node.name.text.endsWith('Props')) {
      const componentName = node.name.text.replace('Props', '')

      node.members.forEach((member: ts.TypeElement) => {
        if (ts.isPropertySignature(member)) {
          // Skip event handlers
          if (isEventProp(member)) {
            return
          }

          const propName = member.name.getText(sourceFile)
          const jsDoc = ts.getJSDocTags(member)
          const description =
            jsDoc
              .find((tag: ts.JSDocTag) => tag.tagName.text === 'description')
              ?.comment?.toString() || ''

          let propType: string | string[] = ''

          if (member.type) {
            propType = normalizeType(member.type, sourceFile)
          }

          propsInterface.push({
            name: propName,
            desc: description,
            type: propType,
            default: '', // You might want to extract default values from defaultProps
          })
        }
      })
    }

    if (ts.isVariableStatement(node)) {
      const declaration = node.declarationList.declarations[0]
      if (declaration && ts.isIdentifier(declaration.name)) {
        if (declaration.name.text === 'defaultProps') {
          // Here you could extract default values
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  if (propsInterface.length > 0) {
    // Extract component name from file path
    const dirName = path.basename(path.dirname(filePath))
    componentName = dirName.charAt(0).toUpperCase() + dirName.slice(1)

    return {
      name: componentName,
      props: propsInterface,
    }
  }

  return null
}

function generatePropsJson() {
  const packagesDir = path.join(__dirname, '../src/packages')
  const components: ComponentDef[] = []

  // Read all component directories
  fs.readdirSync(packagesDir).forEach((dir: string) => {
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
  const outputPath = path.join(__dirname, '../src/props.json')
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2))
}

generatePropsJson()
