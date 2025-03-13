import React from 'react'
import { NoticeBar } from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'

const Demo8 = () => {
  const horseLamp1 = [
    'NoticeBar 公告栏',
    'Cascader 级联选择',
    'DatePicker 日期选择器',
    'CheckBox 复选按钮',
  ]
  const go = (item: any) => {
    console.log(item)
  }
  return (
    <View className="interstroll-list">
      <NoticeBar
        direction="vertical"
        list={horseLamp1}
        speed={10}
        duration={1000}
        height={30}
        onClick={(e) => {
          go(e.target.innerHtml)
        }}
        closeable
      />
    </View>
  )
}
export default Demo8
