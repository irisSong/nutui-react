const fs = require('fs')
const path = require('path')
const { translate } = require('@vitalets/google-translate-api')

// 读取文件内容
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
}

// 写入文件内容
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf-8')
}

// 翻译文本
async function translateText(text, targetLanguage) {
  try {
    const res = await translate(text, { to: targetLanguage })
    return res.text
  } catch (err) {
    console.error('Translation error:', err)
    throw err
  }
}

// 翻译文件
async function translateFile(inputFilePath, outputFilePath, targetLanguage) {
  const content = readFile(inputFilePath)
  const translatedContent = await translateText(content, targetLanguage)
  writeFile(outputFilePath, translatedContent)
}

// 主函数
async function main(inputDir) {
  const inputFilePath = path.join(inputDir, 'doc.md')

  // 检查 doc.md 文件是否存在
  if (!fs.existsSync(inputFilePath)) {
    console.error(`File ${inputFilePath} does not exist.`)
    process.exit(1)
  }

  const outputFilePathEn = path.join(inputDir, 'doc.en-US.md')
  const outputFilePathZhTw = path.join(inputDir, 'doc.zh-TW.md')

  console.log(`Translating ${inputFilePath} to English...`)
  await translateFile(inputFilePath, outputFilePathEn, 'en')

  console.log(`Translating ${inputFilePath} to Traditional Chinese...`)
  await translateFile(inputFilePath, outputFilePathZhTw, 'zh-TW')

  console.log(`Translating ${inputFilePath} to taro...`)
  const content = readFile(inputFilePath)
  const outputFilePathTaro = path.join(inputDir, 'doc.taro.md')
  const translatedContent = content
    .replace(/@nutui\/nutui-react/g, '@nutui/nutui-react-taro')
    .replace(/h5\/demo/g, 'taro/demo')
  writeFile(outputFilePathTaro, translatedContent)

  console.log('Translation complete.')
}

// 获取命令行参数
const args = process.argv.slice(2)
if (args.length !== 1) {
  console.error('Usage: node translate.js <inputDir>')
  process.exit(1)
}
console.log('args', args)
const inputDir = path.join(__dirname, '../src/packages', args[0])

main(inputDir).catch(console.error)
