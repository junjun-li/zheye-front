module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 没有使用的变量, 这个规则我不喜欢
    'no-unused-vars': 'off',
    'vue/no-unused-vars': 'off',
    // 必须使用引号字符串, 我不喜欢, 我喜欢用 模板字符串
    'quotes': 'off'
  }
}
