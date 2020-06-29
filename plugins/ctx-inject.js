const config = require('../server-config')

export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.config = { host: config.host, port: config.port }
}