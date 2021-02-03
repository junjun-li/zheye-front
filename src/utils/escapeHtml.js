import faces from '@/assets/js/face'

export const escapeHtml = (val = '') => {
  // 替换表情
  // 图片替换
  // 链接替换
  // 引用替换
  // 代码块替换
  // hr替换
  console.log(val)
  if (val === '') return
  // face开头
  const face = /\sface\[\w{1,}]/g
}

// 处理表情
