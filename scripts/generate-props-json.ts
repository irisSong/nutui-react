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

function extractPropsFromFile(filePath: string): ComponentDef | null {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  )

  let componentName = ''
  let propsInterface: PropType[] = []

  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node) && node.name.text.endsWith('Props')) {
      const componentName = node.name.text.replace('Props', '')

      node.members.forEach((member: ts.TypeElement) => {
        if (ts.isPropertySignature(member)) {
          const propName = member.name.getText(sourceFile)
          const jsDoc = ts.getJSDocTags(member)
          const description =
            jsDoc
              .find((tag: ts.JSDocTag) => tag.tagName.text === 'description')
              ?.comment?.toString() || ''

          let propType: string | string[] = ''

          if (member.type) {
            if (ts.isUnionTypeNode(member.type)) {
              propType = member.type.types.map((type: ts.TypeNode) =>
                type.getText(sourceFile).replace(/['"]/g, '')
              )
            } else if (ts.isTypeReferenceNode(member.type)) {
              propType = member.type.getText(sourceFile)
            } else {
              propType = member.type.getText(sourceFile)
            }
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
