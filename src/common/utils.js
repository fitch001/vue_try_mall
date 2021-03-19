// 防抖函数
export function debounce(func, delay) {
  let time = null
  // 返回一个函数
  return function (...args) {
    // 如果已经设置定时的话，就清除定时
    if (time) clearTimeout()
    // 设置定时
    setTimeout(() => {
      // 返回待执行的函数
      // 用apply指向调用debounce的对象，相当于this.fn(args);
      func.apply(this, args)
    }, delay)
  }
}

// 节流函数
export function throttle(fn, delay) {
  let timer;
  return function (...arg) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, ...arg);
      timer = null;
      // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
    }, delay)
  }
}


// 时间戳转换函数
export function formatDate(date, fmt) {
  // 获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
// 如果结果不足两位使用0补齐缺失的数值
// 4:4:4  --->  04:04:04
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
