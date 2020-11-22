import Nedb from 'nedb'
import { mergeWith, get as lodashGet, isObject, set, sum, throttle, groupBy, countBy } from 'lodash-es'

export const log = function () {
  console.log(...arguments)
}

/**
 * 对象转表单数据
 *
 * @param {*} obj
 * @returns
 */
export const objToFormData = function (obj) {
  const source = obj || {}
  const formData = new FormData()
  for (let [name, val] of Object.entries(source)) {
    formData.append(name, val)
  }
  return formData
}

/**
 * 不会报错的json parse
 *
 * @param {*} obj
 * @returns
 */
export const jsonpParse = function (obj) {
  try {
    return JSON.parse(obj)
  } catch (error) {
    return obj
  }
}


export const toArray = function (source) {
  let result = []
  if (source instanceof Array) {
    result = source
  } else {
    result = [source]
  }
  return result.filter(f => !['', null, undefined].includes(f))
}

/**
* 创建数据库对象
*
* @param {*} dbPath
* @returns
*/
export const dataset = function (dbPath) {
  return new Nedb({
    filename: dbPath,
    autoload: true
  })
}

/**
* 找到一个值
*
* @param {*} dict_
* @returns
*/
export const datasetFind = function (db, dict_) {
  return new Promise((resolve) => {
    db.findOne(dict_, (err, docs) => {
      resolve(docs)
    })
  })
}

/**
 * 生成随机数
 *
 * @param {number} [n=32]
 * @returns
 */
export const random = function (n = 32) {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let letter = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'
  let maxPos = chars.length
  let result = ''
  for (let i = 0; i < n; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  result = letter.charAt(Math.floor(Math.random() * letter.length)) + result
  return result.substring(0, result.length - 1)
}

export const queryToObj = function (url_) {
  const url = url_ || window.location.href
  let result = {}
  const urlSplit = url.split('?')
  const len = urlSplit.length - 1
  let queryParam = urlSplit[len] || ''
  queryParam
    .split('&')
    .filter(str => str !== '')
    .forEach(str => {
      const [key, value] = str.split('=')
      result[key] = value
    })
  return result
}

export const objToQuery = function (obj) {
  let strList = []
  Object.entries(obj).forEach(entries => {
    const [key, value] = entries
    strList.push(`${key}=${value}`)
  })
  return encodeURIComponent(strList.join('&'))
}

/**
 * lodash的 get函数超集，当取得值为null、 null、undefined,''将返回默认值
 * path支持数组，会依次选取优先级高的放前面
 * @static
 * @param {object} obj 源数据
 * @param {string|array} path 参数路径
 * @param {*} defaultValue 默认值
 * @returns
 *
 */
export const get = function (obj, path, defaultValue) {
  let value = null
  const rules = [null, 'null', '', undefined]
  const pathList = toArray(path)
  for (let p of pathList) {
    value = lodashGet(obj, p + '', null)
    if (!rules.includes(value)) {
      return value
    }
  }
  return defaultValue
}

export const dpi = function (dom) {
  let dx = window.innerWidth / 1920
  dx = Math.max(dx * 0.9, 1)
  const fontSize = Number(getComputedStyle(dom).fontSize.replace('px', ''))
  const size = Math.ceil(fontSize * dx)
  const style = dom.getAttribute('style') || ''
  dom.setAttribute('style', style + `font-size:${size}px;`)
}

export const isInViewPort = function (el) {
  // viewPortHeight 兼容所有浏览器写法
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const offsetTop = el.offsetTop
  const scrollTop = document.documentElement.scrollTop
  const top = offsetTop - scrollTop
  return top <= viewPortHeight + 100
}


/**
* 动态加载js
*
* @param {Object} srcDict src的字典
*/
export const createScriptFormRemote = function (srcDict) {
  for (let key of Object.keys(srcDict)) {
    if (document.querySelector(`#${key}`) == null) {
      const src = srcDict[key]
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = src
      script.id = key
      document.head.appendChild(script)
    }
  }
}

/**
 * 字符串模板转换 ，将数据源对应{键}的值填入str
 *
 * @param {*} str 字符串
 * @param {*} source 数据源
 * @param {*} handle 处理函数
 * @returns
 */
export const strFormat = function (str, source, handle = () => { }) {
  if (str instanceof Function) {
    return str(source)
  } else if (!isObject(source)) {
    return str
  }
  const data = { ...source }
  const r = /{[^}]+}/
  while (r.test(str)) {
    const key = str
      .match(r)
      .toString()
      .replace('{', '')
      .replace('}', '')
    const value = get(data, key, [])
    const ids = toArray(value).filter(id => id != null)
    str = str.replace(r, ids.join(','))
    handle(key, value)
  }
  return str
}

/**
* 等待一段时间
*
* @param {*} time
* @returns
*/
export const sleep = async function (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const openLoading = function () {
  const loading = document.querySelector('#loading')
  loading.classList.remove('none')
}

export const closeLoading = function () {
  const loading = document.querySelector('#loading')
  loading.classList.add('none')
}

/**
* 将html插入body
*
* @param {*} html
*/
export const insertBody = function (html) {
  document.querySelector('body').insertAdjacentHTML('beforeend', html)
}

/**
* 空间两点之间的距离
*
* @param {*} [point1=[]]
* @param {*} [point2=[]]
* @returns
*/
export const pointDistance = function (point1 = [], point2 = []) {
  let result = 0
  for (let i = 0; i < point1.length; i++) {
    const x1 = point1[i]
    const x2 = point2[i]
    const x = x2 - x1
    const value = Math.pow(x, 2)
    result += value
  }
  return Math.sqrt(result)
}

/**
 * lodash 的 mergeRight 改造，将会选择为null，undefined的值
 *
 * @returns
 */
export const merge = function () {
  return mergeWith(...arguments, (obj, source) => {
    if ([obj, source].some(item => [null, undefined].includes(item))) {
      return obj || source
    } else if ([obj, source].every(item => item instanceof Array)) {
      const objLen = get(obj, 'length', 0)
      const sourceLen = get(source, 'length', 0)
      if (objLen !== sourceLen) {
        return source
      }
    }
  })
}

export const jsonParse = function (obj) {
  try {
    return JSON.parse(obj)
  } catch (error) {
    return obj
  }
}

/**
* 文本转dom树
*
* @param {*} data
* @returns {Document}
*/
export const textToDom = function (data) {
  const p = new DOMParser()
  const Html = p.parseFromString(data, 'text/html')
  return Html
}

/**
* iframe式请求
*
* @param {*} url
* @param {*} callback
* @returns
*/
export const iframeRequest = function (url, wait) {
  const body = document.body
  const iframe = document.createElement('iframe')
  iframe.src = url
  body.appendChild(iframe)
  return new Promise((resolve) => {
    iframe.onload = async () => {
      try {
        const win = iframe.contentWindow
        const doc = win.document
        if (wait instanceof Function) {
          await wait(doc, win)
        }
        resolve({ doc, win })
      } catch (error) {
        console.log('报错了', error, url)
        resolve(null)
      } finally {
        setTimeout(() => {
          iframe.remove()
        }, 500)
      }
    }
  })
}

/**
* 选中元素
*
* @param {string} s
* @returns {HTMLElement}
*/
export const q = function (s) {
  return document.querySelector(s)
}

/**
* document.querySelectorAll简化
*
* @param {String} s
* @returns {Array<HTMLElement>}
*/
export const qs = function (s) {
  return [...document.querySelectorAll(s)]
}

/**
* 选中元素
*
* @param {string} s
* @returns {HTMLElement}
*/
export const e = (dom, selector) => dom.querySelector(selector)

/**
* 相当于dom.querySelectorAll
*
* @param {*} dom
* @returns {Array<HTMLElementTagNameMap>}
* @param {*} selector
*/
export const es = (dom, selector) => [...dom.querySelectorAll(selector)]


/**
 * 清空cookies
 *
 */
export const clearCookie = function () {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  let domainArray = ['.dtyunxi.cn', '.dtyunxi.com']
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString()
      document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString()
      domainArray.forEach(domain => {
        document.cookie = keys[i] + `=0;path=/;domain=${domain};expires=` + new Date(0).toUTCString()
      })
    }
  }
}

export const average = function (list) {
  if (list instanceof Array) {
    const total = sum(list.map(i => typeof i === 'number' ? i : Number(i)))
    const len = list.length
    return Math.floor(total / len)
  } else {
    return 0
  }
}

/**
* 判断是否移动端
*
* @returns
*/
export const isMobile = function () {
  let info = navigator.userAgent
  let agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod', 'iPad']
  for (let i = 0; i < agents.length; i++) {
    if (info.indexOf(agents[i]) >= 0) return true
  }
  return false
}

/**
* 生成顺序数组
*
* @param {*} n
* @returns
*/
export const rang = function (n) {
  let num = Math.floor(n)
  return Array(num).fill('').map((_, index) => index)
}

/**
* 多次执行 handle 并且以列表形式返回
*
* @param {*} n
* @param {*} handle
* @returns {Array}
*/
export const manyFunction = function (n, handle) {
  let result = []
  rang(n).forEach((_, index) => {
    result.push(handle(index))
  })
  return result
}

/**
 * 在一个对象里面获得多个值
 *
 * @param {*} obj
 * @param {Array} pathList
 * @param {*} defaultValue
 * @returns Array
 */
export const getBatch = function (obj, pathList, defaultValue) {
  let result = []
  for (let path of toArray(pathList)) {
    const value = get(obj, path, defaultValue)
    result.push(value)
  }
  return result
}

/**
* 获得元素宽高
*
* @param {String} selector
* @returns
*/
export const getEleSize = function (selector) {
  const ele = q(selector)
  if (ele == null) {
    return
  }
  const res = getBatch(getComputedStyle(ele), ['width', 'height'], [0, 0])
  return res.map(i => Number(i.replace('px', '')))
}

/**
* 鼠标与元素移动方向相反
* 
*
* @param {String} parentSelector 不动区域选择器
* @param {String} selector 运动区域选择器 （宽高必须大于parent）
*/
export const mouseMutex = function (parentSelector, selector, hz = 60) {
  if (process.client) {
    const parent = q(parentSelector)
    if (parent == null) return
    const moveDom = q(selector)
    const render = function (event) {
      const [width, height] = getEleSize(parentSelector)
      const center = { x: width / 2, y: height / 2 }
      const x = get(event, 'clientX', 0)
      const y = get(event, 'clientY', 0)
      const proportion = 20
      let dx = ((-1 * (x - center['x'])) / proportion).toFixed(4)
      let dy = (-1 * (y - center['y']) / proportion).toFixed(4)
      moveDom.setAttribute('style', `transform: translate3D(${dx}px,${dy}px,0px);`)
    }
    parent.addEventListener('mousemove', throttle(render, 1000 / hz))
  }
}

/**
* 数字转中文
*
* @param {*} num
* @returns
*/
export const numberUppercase = function (num) {
  let n = Number(num)
  var upperCaseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿']
  var length = String(n).length
  if (length == 1) {
    return upperCaseNumber[n]
  } else if (length == 2) {
    if (n == 10) {
      return upperCaseNumber[n]
    } else if (n > 10 && n < 20) {
      return '十' + upperCaseNumber[String(n).charAt(1)]
    } else {
      return upperCaseNumber[String(n).charAt(0)] + '十' + upperCaseNumber[String(n).charAt(1)].replace('零', '')
    }
  }
}

export const today = function (d) {
  let date = d == null ? new Date() : new Date(d)
  const nowMonth = date.getMonth() + 1
  const strDate = date.getDate()
  const year = date.getFullYear()
  return `${numberUppercase(nowMonth)}月 ${strDate}, ${year}`
}

/**
 * 滚动条动画移动到元素锚点
 *
 * @param {HTMLElement} ele 移动到的元素
 * @param {number} [dy=window.outerHeight / 6] 偏移量
 * @param {number} [time=5] 动画一帧的时间
 */
export const scrolMove = function (ele, speed = 1, dy = window.outerHeight / 6, time = 5) {
  let total = docTop(ele) - dy
  let distance = document.documentElement.scrollTop || document.body.scrollTop
  // 计算每一小段的距离
  let step = total / (50 * speed)
  let scrolMoveInterval = setInterval(() => {
    if (distance < total) {
      distance += step; // 移动一小段
      document.body.scrollTop = distance
      document.documentElement.scrollTop = distance; // 设定每一次跳动的时间间隔为10ms
    }
    else {
      clearInterval(scrolMoveInterval)
    }
  }, time)
}

/**
 * 获得元素距离文档顶部距离
 *
 * @param {HTMLElement} ele
 * @returns
 */
export const docTop = function (ele) {
  let top = ele.offsetTop
  while (ele.offsetParent != null && (ele = ele.offsetParent)) {
    top += ele.offsetTop
  }
  return top
}

/**
 * 获得元素距离文档左边距离
 *
 * @param {HTMLElement} ele
 * @returns
 */
export const docLeft = function (ele) {
  let top = ele.offsetTop
  while (ele.offsetParent != null && (ele = ele.offsetParent)) {
    top += ele.offsetTop
  }
  return top
}

/**
* 获得滚动条位置
*
* @returns
*/
export const scrollPoint = function () {
  return get(document, ['documentElement.scrollTop', 'body.scrollTop'])
}

/**
 * 滚动条动画移动到对应坐标
 *
 * @param {Number} y 移动到对应坐标
 * @param {number} [dy_=0] 偏移量
 * @param {number} [time=5] 动画一帧的时间
 */
export const scrolMovePoint = function (y, speed = 50, time = 5) {
  let distance = scrollPoint()
  const move = function (dy, n = 1) {
    setTimeout(() => {
      distance += dy * n
      if ((distance * n) >= (y * n)) {
        if (n < 0) {
          set(document, 'documentElement.scrollTop', distance - 50)
          set(document, 'body.scrollTop', distance - 50)
        }
        return
      } else {
        set(document, 'documentElement.scrollTop', distance)
        set(document, 'body.scrollTop', distance)
        move(dy, n)
      }
    }, time)
  }
  if (y > distance) {
    const dy = (y - distance) * speed
    move(dy)
  } else {
    const dy = (distance - y) * speed
    move(dy, -1)
  }
}

/**
* 时间戳转日期
*
* @param {*} t
* @returns
*/
export const timestapToDate = function (t) {
  let date = new Date(t)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() + ' '
  let h = date.getHours() + ':'
  let m = date.getMinutes() + ':'
  let s = date.getSeconds()
  return Y + M + D + h + m + s
}

/**
 * 计算markdown一行，当前标题的层级
 *
 * @param {*} code
 * @returns
 */
const countMarkdown = function (code) {
  let n = 0
  while (code[n] === '#') {
    n++
  }
  return n
}

/**
* 解析markdown目录
*
* @param {*} m
*/
export const markDownToc = function (m) {
  const r = /#*/
  const codes = m.split('\n').filter(c => {
    const list = [
      c != null,
      c !== '',
      get(c, '[0]', '').trim() === '#'
    ]
    return list.every(l => l === true)
  }).map(code => ({ level: countMarkdown(code), code: code.replace(r, '') }))
  return codes
}