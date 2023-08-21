const path = require('path')

module.exports = {
  poweredByHeader: false,
  trailingSlash: true,
  future: {
    webpack5: true
  },
  assetPrefix: process.env.HOSTNAME,
  serverRuntimeConfig: {
    api: process.env.NEST_PUBLIC_API_ENDPOINT,
    web: process.env.NEST_PUBLIC_WEB_ENDPOINT,
    basePath: process.env.NEST_PUBLIC_BASE_PATH
  },
  publicRuntimeConfig: {
    basePath: process.env.NEST_PUBLIC_BASE_PATH,
    web: process.env.NEST_PUBLIC_WEB_ENDPOINT,
    api: process.env.NEST_PUBLIC_API_ENDPOINT
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
};
