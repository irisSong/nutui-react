import React, { CSSProperties, FC } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { BasicComponent } from '@/utils/typings'

export interface SafeAreaProps extends BasicComponent {
  position: 'top' | 'bottom'
}

const classPrefix = 'nut-safe-area'
export const SafeArea: FC<SafeAreaProps> = (props) => {
  const { position, style } = props
  const isRN = Taro.getEnv() === Taro.ENV_TYPE.RN
  const styles: CSSProperties = isRN
    ? ({
        ...style,
        ...{
          paddingBottom: 10,
        },
      } as CSSProperties)
    : style || {}
  return (
    <View
      className={classNames(classPrefix, `${classPrefix}-position-${position}`)}
      style={styles}
    />
  )
}
