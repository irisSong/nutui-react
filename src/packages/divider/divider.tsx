import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

import { BasicComponent, ComponentDefaults } from '@/utils/typings'

export type DividerContentPosition = 'left' | 'center' | 'right'
export type DividerDirection = 'horizontal' | 'vertical'
export interface DividerProps extends BasicComponent {
  contentPosition: DividerContentPosition
  direction?: DividerDirection
}
const defaultProps = {
  ...ComponentDefaults,
  contentPosition: 'center',
  direction: 'horizontal',
} as DividerProps

const classPrefix = `nut-divider`
export const Divider: FunctionComponent<
  Partial<DividerProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { children, contentPosition, style, className, direction, ...rest } = {
    ...defaultProps,
    ...props,
  }
  const classes =
    direction === 'horizontal'
      ? classNames({
          [`${classPrefix}`]: true,
          [`${classPrefix}-center`]: children,
          [`${classPrefix}-left`]: contentPosition === 'left',
          [`${classPrefix}-right`]: contentPosition === 'right',
          [`${classPrefix}-hairline`]: true,
        })
      : classNames({
          [`${classPrefix}`]: true,
          [`${classPrefix}-vertical`]: direction === 'vertical',
        })
  const getClassNames = (direction: string) => {
    return `${classes
      .split(' ')
      .map((item) => `${item}-${direction}`)
      .join(' ')}`
  }
  return (
    <div className={`${classes} ${className || ''}`} style={style} {...rest}>
      {direction === 'horizontal' && (
        <div className={getClassNames('before')} />
      )}
      {children}
      {direction === 'horizontal' && <div className={getClassNames('after')} />}
    </div>
  )
}

Divider.defaultProps = defaultProps
Divider.displayName = 'NutDivider'
