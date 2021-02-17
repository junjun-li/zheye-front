/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime (time, cFormat = '{y}-{m}-{d} {h}:{i}:{s}') {
  if (arguments.length === 0) {
    return null
  }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
}

const getElementY = (elem) => {
  return window.pageYOffset + document.querySelector(elem).getBoundingClientRect().top
}

/**
 * 滚动到指定的元素
 * @param {String} elem DOM元素
 * @param {Number} duration 滚动动画执行的时间
 * @param {Number} offset 滚动偏移量
 */
export const scrollToElem = (elem, duration, offset) => {
  // 初始位置
  const startingY = window.pageYOffset
  const elementY = getElementY(elem)
  // 需要去滚动的距离
  const diff = elementY - startingY + offset
  // 如果 diff 0
  if (!diff) return
  const easing = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  let start
  window.requestAnimationFrame(function step (timestamp) {
    if (!start) start = timestamp
    // 计算时间的差值，根据差值计算偏移量
    const time = timestamp - start
    let percent = Math.min(time / duration, 1)
    percent = easing(percent)
    window.scrollTo(0, startingY + diff * percent)

    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}
