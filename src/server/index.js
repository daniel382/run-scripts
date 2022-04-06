import { config } from './config.js'
import { server } from './server.js'

const { host, port } = config
server.listen(config.port)
  .on('listening', () => console.log(`Server listening on http://${host}:${port}`))
