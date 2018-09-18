const serverConfig = require('../server.config')
const app = require('../server/index')

const port = serverConfig.port

const server = app.listen(port, () => {
  console.log(`> Listening at http://localhost:${port}`)
})
