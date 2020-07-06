const apiVersion = "1"
const apiPrefix = '/api/v' + apiVersion
const apiDocsPrefix = '/api-docs/v' + apiVersion

const router = require('./autoload')(apiPrefix, apiDocsPrefix)

module.exports = router