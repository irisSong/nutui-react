import React from 'react'
import { NoticeBar, Space } from '@nutui/nutui-react'
import { Failure, Service } from '@nutui/icons-react'

const Demo4 = () => {
  const text =
    'NutUI-React 是京东风格的 React 移动端组件库，开发和服务于移动 Web 界面的企业级产品。'
  const hello = () => {
    console.log('hello world')
  }
  return (
    <Space direction="vertical">
      <NoticeBar closeable onClick={hello}>
        {text}
      </NoticeBar>
      <NoticeBar closeable rightIcon={<Failure />} onClick={hello}>
        {text}
      </NoticeBar>
      <NoticeBar leftIcon={<Service color="#4d88ff" />}>
        <a href="https://www.jd.com" style={{ color: '#4d88ff' }}>
          京东商城
        </a>
      </NoticeBar>
    </Space>
  )
}
export default Demo4
