module.exports = {
  development: {
    isProduction: false,
    apiPort: process.env.APIPORT,
    db: 'postgres://postgres:26111991@localhost/shooting-io-development'
  },
  production: {
    isProduction: true,
    apiPort: process.env.APIPORT,
  }
}[process.env.NODE_ENV || 'development'];
