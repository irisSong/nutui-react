const fs = require('fs')
const path = require('path')
const { translate } = require('@vitalets/google-translate-api')

async function translateText() {
  try {
    const { text } = await translate('Привет, мир! Как дела?', { to: 'en' })
    console.log(text) // => 'Hello, world! How are you?'
  } catch (error) {
    console.error('Error during translation:', error)
  }
}

translateText()
