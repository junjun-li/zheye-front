import { extend, localize } from 'vee-validate'
import {
  required,
  email,
  min,
  length,
  confirmed,
  max,
  is_not
} from 'vee-validate/dist/rules'

import zh from 'vee-validate/dist/locale/zh_CN.json'
// 设置语言
// https://logaretm.github.io/vee-validate/guide/localization.html#using-the-default-i18n

// No message specified.
extend('email', email)
extend('min', min)
extend('max', max)
extend('required', required)
extend('length', length)
extend('confirmed', confirmed)
extend('is_not', is_not)
// 使用中文 方式1
// localize('zh_CN', {
//   messages: {
//     ...zh_CN.messages,
//     required: '请输入{_field_}',
//     email:'请输入😯😯'
//   }
// })

// 使用中文方式2
localize('zh')
// 对单独的进行设置
localize({
  zh: {
    messages: {
      ...zh.messages,
      required: '请输入{_field_}'
    },
    names: {
      email: '邮箱',
      password: '密码',
      rePassword: '密码',
      code: '验证码',
      name: '昵称',
      location: '城市',
      gender: '性别',
      // 修改密码所需
      oldPass: '当前密码',
      newPass: '新密码',
      repass: '密码',
      catalog: '专栏',
      title: '标题'
    },
    fields: {
      email: {
        email: '邮箱不符合规范'
      },
      gender: {
        required: '请选择性别'
      },
      title: {
        required: '请填写标题'
      },
      catalog: {
        is_not: '请选择{_field_}'
      },
      rePassword: {
        required: '请再次输入密码',
        confirmed: '两次密码不一致'
      },
      password: {
        min: '{_field_}的最小长度为6位'
      },
      code: {
        length: '{_field_}的长度为4位'
      },
      name: {
        min: '{_field_}的最小长度为4位',
        max: '{_field_}的最大长度为10位'
      }
    }
  }
})
