import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { BasicComponent, ComponentDefaults } from '@/utils/typings'
import { padZero } from '@/utils/pad-zero'

export interface CountDownTimeProps {
  d: number
  h: number
  m: number
  s: number
  ms: number
}
export type CountDownType = 'default' | 'primary'
export interface CountDownProps extends BasicComponent {
  type: CountDownType
  paused: boolean
  startTime: number
  endTime: number
  remainingTime: number
  millisecond: boolean
  format: string
  autoStart: boolean
  time: number
  destroy: boolean
  onEnd: () => void
  onPaused: (restTime: number) => void
  onRestart: (restTime: number) => void
  onUpdate: (restTime: any) => void
  children: ReactNode
}

const defaultProps = {
  ...ComponentDefaults,
  type: 'default',
  paused: false,
  startTime: Date.now(),
  endTime: Date.now(),
  remainingTime: 0,
  millisecond: false,
  format: 'HH:mm:ss',
  autoStart: true,
  time: 0,
  destroy: false,
} as CountDownProps

const InternalCountDown: ForwardRefRenderFunction<
  unknown,
  Partial<CountDownProps>
> = (props, ref) => {
  const {
    type,
    paused,
    startTime,
    endTime,
    remainingTime,
    millisecond,
    format,
    autoStart,
    time,
    destroy,
    className,
    style,
    onEnd,
    onPaused,
    onRestart,
    onUpdate,
    children,
    ...rest
  } = { ...defaultProps, ...props }
  const classPrefix = 'nut-countdown'
  const [restTimeStamp, setRestTime] = useState(0)
  const stateRef = useRef({
    pauseTime: 0,
    curr: 0,
    isPaused: paused,
    isIninted: false,
    timer: 0,
    restTime: 0, // 倒计时剩余时间时间
    counting: !paused && autoStart, // 是否处于倒计时中
    handleEndTime: Date.now(), // 最终截止时间
    diffTime: 0, // 设置了 startTime 时，与 date.now() 的差异
  })

  // TODO: 后期统一替换
  const harmonyAndRn = [
    Taro.ENV_TYPE.RN,
    Taro.ENV_TYPE.HARMONYHYBRID,
    Taro.ENV_TYPE.HARMONY,
    // @ts-ignore
  ].includes(Taro.getEnv())

  // 时间戳转换 或 获取当前时间的时间戳
  const getTimeStamp = (timeStr?: string | number) => {
    if (!timeStr) return Date.now()
    let t = timeStr
    t = Number(t) > 0 ? +t : t.toString().replace(/-/g, '/')
    return new Date(t).getTime()
  }

  // 倒计时 interval
  const initTime = () => {
    if (remainingTime) {
      stateRef.current.handleEndTime = Date.now() + Number(remainingTime)
    } else {
      stateRef.current.handleEndTime = endTime
      if (!harmonyAndRn) {
        stateRef.current.diffTime = Date.now() - getTimeStamp(startTime) // 时间差
      }
    }
    if (!stateRef.current.counting) stateRef.current.counting = true
    tick()
  }

  const tick = () => {
    stateRef.current.timer = requestAnimationFrame(() => {
      if (stateRef.current.counting) {
        const currentTime = Date.now() - stateRef.current.diffTime
        const remainTime = Math.max(
          stateRef.current.handleEndTime - currentTime,
          0
        )

        stateRef.current.restTime = remainTime
        setRestTime(remainTime)

        if (!remainTime) {
          stateRef.current.counting = false
          pause()
          onEnd && onEnd()
        }

        if (remainTime > 0) {
          tick()
        }
      }
    })
  }

  // 将倒计时剩余时间格式化   参数：t时间戳 type custom 自定义类型
  const formatRemainTime = (t: number, type?: string) => {
    const ts = t
    const rest = {
      d: 0,
      h: 0,
      m: 0,
      s: 0,
      ms: 0,
    }

    const SECOND = 1000
    const MINUTE = 60 * SECOND
    const HOUR = 60 * MINUTE
    const DAY = 24 * HOUR
    if (ts > 0) {
      rest.d = ts >= SECOND ? Math.floor(ts / DAY) : 0
      rest.h = Math.floor((ts % DAY) / HOUR)
      rest.m = Math.floor((ts % HOUR) / MINUTE)
      rest.s = Math.floor((ts % MINUTE) / SECOND)
      rest.ms = Math.floor(ts % SECOND)
    }
    return type === 'custom' ? rest : parseFormat({ ...rest })
  }

  const parseFormat = (time: CountDownTimeProps) => {
    const { d } = time
    let { h, m, s, ms } = time
    let formatCache = format

    if (formatCache.includes('DD')) {
      formatCache = formatCache.replace('DD', padZero(d))
    } else {
      h += Number(d) * 24
    }

    if (formatCache.includes('HH')) {
      formatCache = formatCache.replace('HH', padZero(h))
    } else {
      m += Number(h) * 60
    }

    if (formatCache.includes('mm')) {
      formatCache = formatCache.replace('mm', padZero(m))
    } else {
      s += Number(m) * 60
    }

    if (formatCache.includes('ss')) {
      formatCache = formatCache.replace('ss', padZero(s))
    } else {
      ms += Number(s) * 1000
    }

    if (formatCache.includes('S')) {
      const msC = padZero(ms, 3).toString()

      if (formatCache.includes('SSS')) {
        formatCache = formatCache.replace('SSS', msC)
      } else if (formatCache.includes('SS')) {
        formatCache = formatCache.replace('SS', msC.slice(0, 2))
      } else if (formatCache.includes('S')) {
        formatCache = formatCache.replace('SS', msC.slice(0, 1))
      }
    }
    formatCache = formatCache.replace(
      /(\d+)/g,
      type === 'primary'
        ? `<View class="nut-countdown-number-primary">$1</View>`
        : `<View class="nut-countdown-number">$1</View>`
    )

    return formatCache
  }

  // 暂定
  const pause = () => {
    cancelAnimationFrame(stateRef.current.timer)
    stateRef.current.counting = false
    onPaused && onPaused(stateRef.current.restTime)
  }

  useImperativeHandle(ref, () => ({
    start: () => {
      if (!stateRef.current.counting && !autoStart) {
        stateRef.current.counting = true
        stateRef.current.handleEndTime =
          Date.now() + Number(stateRef.current.restTime)
        tick()
        onRestart && onRestart(stateRef.current.restTime)
      }
    },
    pause: () => {
      cancelAnimationFrame(stateRef.current.timer)
      stateRef.current.counting = false
      onPaused && onPaused(stateRef.current.restTime)
    },
    reset: () => {
      if (!autoStart) {
        pause()
        stateRef.current.restTime = time
        setRestTime(time)
      }
    },
  }))

  // 监听值变更
  useEffect(() => {
    const tranTime = formatRemainTime(stateRef.current.restTime, 'custom')

    onUpdate && onUpdate(tranTime)
  }, [restTimeStamp])

  // 监听暂停
  useEffect(() => {
    if (stateRef.current.isIninted) {
      if (paused) {
        if (stateRef.current.counting) {
          pause()
        }
      } else {
        if (!stateRef.current.counting) {
          stateRef.current.counting = true
          stateRef.current.handleEndTime =
            Date.now() + Number(stateRef.current.restTime)
          tick()
        }
        onRestart && onRestart(stateRef.current.restTime)
      }
    }
  }, [paused])

  // 监听开始结束时间变更
  useEffect(() => {
    if (stateRef.current.isIninted) {
      initTime()
    }
  }, [endTime, startTime, remainingTime])

  // 初始化
  useEffect(() => {
    if (autoStart) {
      initTime()
    } else {
      stateRef.current.restTime = time
      setRestTime(time)
    }
    if (!stateRef.current.isIninted) {
      stateRef.current.isIninted = true
    }
    return componentWillUnmount
  }, [])

  const componentWillUnmount = () => {
    destroy && cancelAnimationFrame(stateRef.current.timer)
  }

  const renderTime = (() => {
    return formatRemainTime(stateRef.current.restTime)
  })()

  const getUnit = (unit: string) => {
    const formatArr = format.split(/(DD|HH|mm|ss|S)/)
    const index = formatArr.indexOf(unit)
    return index > -1 ? formatArr[index + 1] : ':'
  }

  const renderTimeItem = (
    formatUnit: string,
    time: number | string,
    unit = ''
  ) => {
    return (
      <>
        {format.includes(formatUnit) ? (
          <>
            <View
              className={`${classPrefix}-number${type === 'primary' ? '-primary' : ''}`}
            >
              {padZero(time)}
            </View>
            {unit ? (
              <View className={`${classPrefix}-unit`}>{getUnit(unit)}</View>
            ) : null}
          </>
        ) : null}
      </>
    )
  }

  const renderTaroTime = () => {
    const formatCache = formatRemainTime(stateRef.current.restTime, 'custom')
    const { d, h, m, s, ms } = formatCache as CountDownTimeProps
    const digit = format.match(/S/g)?.length
    // format可能是DD天HH时mm分SSS秒或者DD天HH时mm分S秒或是DD：HH：mm：ss

    return (
      <>
        {renderTimeItem('DD', d, 'DD')}
        {renderTimeItem('HH', h, 'HH')}
        {renderTimeItem('mm', m, 'mm')}
        {renderTimeItem('ss', s)}
        {(format.includes('S') || getUnit('ss') !== ':') && (
          <>
            <View className={`${classPrefix}-unit`}>{getUnit('ss')}</View>
          </>
        )}
        {renderTimeItem(
          'S',
          padZero(ms, 3)
            .toString()
            .slice(0, digit || 2)
        )}
      </>
    )
  }

  return (
    <>
      {children || (
        <>
          {!harmonyAndRn ? (
            <View
              className={`${classPrefix} ${className}`}
              style={{ ...style }}
              {...rest}
              dangerouslySetInnerHTML={{
                __html: `${renderTime}`,
              }}
            />
          ) : (
            <View
              className={`${classPrefix} ${className}`}
              style={{ ...style }}
              {...rest}
            >
              {renderTaroTime()}
            </View>
          )}
        </>
      )}
    </>
  )
}

export const CountDown = React.forwardRef<unknown, Partial<CountDownProps>>(
  InternalCountDown
)

CountDown.displayName = 'NutCountDown'
