import React from 'react'
import Taro from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import Header from '@/sites/components/header'
import { useTranslate } from '@/sites/assets/locale/taro'
import Demo1 from './demos/taro/demo1'

const SafeAreaDemo = () => {
  const [translated] = useTranslate({
    'zh-CN': {
      basic: '基础用法',
    },
    'zh-TW': {
      basic: '基礎用法',
    },
    'en-US': {
      basic: 'Basic Usage',
    },
  })

  return (
    <>
      <Header />
      <ScrollView className={`demo ${Taro.getEnv() === 'WEB' ? 'web' : ''}`}>
        <View className="h2">{translated.basic}</View>
        <Demo1 />
      </ScrollView>
    </>
  )
}

export default SafeAreaDemo
