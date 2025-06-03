import Cookies from 'universal-cookie'

// 初始化 cookie 实例
const cookies = new Cookies()

// cookie 操作
export const cookieHelper = {
  get(name) {
    if (name) return cookies.get(name)
    return cookies.getAll()
  },

  set(name, value, expiredays = 7) {
    const expires = new Date(Date.now() + expiredays * 864e5) // 默认 7 天
    cookies.set(name, value, { path: '/', expires })
  },

  remove(name) {
    cookies.remove(name, { path: '/' })
  },
}

// 参数序列化
export const queryStringify = (param) => {
  const query = []
  for (let k in param) {
    if (param[k] !== undefined && param[k] !== null) {
      query.push(encodeURIComponent(k) + '=' + encodeURIComponent(param[k]))
    }
  }
  return query.join('&')
}

// 颜色混合（十六进制 RGB）
export const colorMix = (color1, color2, weight = 0.5) => {
  weight = Math.max(0, Math.min(1, weight))
  const hexToInt = hex => parseInt(hex, 16)

  const r = Math.round(hexToInt(color1.slice(1, 3)) * (1 - weight) + hexToInt(color2.slice(1, 3)) * weight)
  const g = Math.round(hexToInt(color1.slice(3, 5)) * (1 - weight) + hexToInt(color2.slice(3, 5)) * weight)
  const b = Math.round(hexToInt(color1.slice(5, 7)) * (1 - weight) + hexToInt(color2.slice(5, 7)) * weight)

  const toHex = x => ('0' + x.toString(16)).slice(-2)
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// Java UTC 日期转字符串
export const javaUTCDateToString = (timestamp) => {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${zeroPadding(date.getMonth() + 1)}-${zeroPadding(date.getDate())}`
}

export const javaDateTimeToString = (timestamp) => {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${zeroPadding(date.getMonth() + 1)}-${zeroPadding(date.getDate())} ${zeroPadding(date.getHours())}:${zeroPadding(date.getMinutes())}:${zeroPadding(date.getSeconds())}`
}

// 数字补零（如 09）
export const zeroPadding = (num) => {
  return String(num).padStart(2, '0')
}

// 💰 金额格式化
const reg = /-?\d{1,3}(?=(\d{3})+(\.|$))/g
export const amountBeautify = (num, currency = '', fixed = 2, error = '--') => {
  if (isNaN(num) || num === null || num === undefined) return error
  const fixedNum = Number(num).toFixed(fixed)
  const formatted = fixedNum.replace(reg, '$&,')
  return (currency ? currency + ' ' : '') + formatted
}

// reactive对象属性值批量更改
export const resetReactive = (obj, toValue) => {
  Object.keys(obj).forEach(key => {
    obj[key] = toValue
  })
}

// 工具集统一导出
export const helpers = {
  cookieHelper,
  queryStringify,
  colorMix,
  javaUTCDateToString,
  javaDateTimeToString,
  zeroPadding,
  amountBeautify,
  resetReactive
}