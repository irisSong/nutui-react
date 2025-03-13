import React from 'react'
import { NoticeBar } from '@nutui/nutui-react-taro'
import { Failure, Service } from '@nutui/icons-react-taro'
import { Text } from '@tarojs/components'

const Demo4 = () => {
  const text =
    'NutUI-React 是京东风格的 React 移动端组件库，开发和服务于移动 Web 界面的企业级产品。'
  const hello = () => {
    console.log('hello world')
  }
  function redirectTo(arg0: { url: string }) {
    throw new Error('Function not implemented.')
  }

  return (
    <>
      <NoticeBar closeable onClick={hello}>
        {text}
      </NoticeBar>

      <NoticeBar closeable rightIcon={<Failure />} onClick={hello}>
        {text}
      </NoticeBar>

      <NoticeBar leftIcon={<Service color="#4d88ff" />}>
        <Text
          onClick={() => {
            redirectTo({ url: 'https://www.jd.com' })
          }}
          style={{ color: '#4d88ff' }}
        >
          京东商城
        </Text>
      </NoticeBar>
    </>
  )
}
export default Demo4
