const isDev = process.env.NODE_ENV === 'development'

export default {
  baseUrl: {
    dev: 'http://localhost:3000',
    pro: 'http://api.dev.toimc.com:22000'
  }
}
