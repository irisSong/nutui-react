import React, { useState } from 'react'
import { Cell, Overlay } from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'
import { harmony } from '@/utils/platform-taro'

const Demo1 = () => {
  const [visible, setVisible] = useState(false)
  const handleToggleShow = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  return (
    <>
      <Cell>
        <View>点击按钮显示遮罩层</View>
      </Cell>
      <View>111</View>
      {harmony() ? <jdrecommend /> : null}
      <View>111</View>
      <Overlay
        visible={visible}
        onClick={onClose}
        style={{ '--nutui-overlay-zIndex': 2020 }}
        afterShow={() => {
          console.log('afterShow')
        }}
        afterClose={() => {
          console.log('afterClose')
        }}
      />
    </>
  )
}
export default Demo1
