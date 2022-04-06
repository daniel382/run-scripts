import { config } from './config.js'
import { Controller } from './controller.js'

const controller = new Controller()
const {
  constants,
  pages: {
    homeHTML,
  }
} = config

const routes = {
  'GET:/': async function (request, response) {
    const { stream } = await controller.getFileStream(homeHTML)

    // content type padrão 'text/html '
    return stream.pipe(response)
  },

  'GET:/assets': async function (request, response) {
    const { url: filepath } = request
    const { stream, type } = await controller.getFileStream(filepath)

    const contentType = constants.CONTENT_TYPE[type]
    if (contentType) {
      response.writeHead(200, { 'Content-Type': contentType })
    }

    return stream.pipe(response)
  },

  'GET:/run': async function (request, response) {
    const { url } = request
    const script = url.split('?script=')[1]
    if (!script) {
      response.writeHead(400)
      response.end('Missing script path')
    }

    const result = await controller.runScript(script)
    response.end(result)
  }
}

function handleError (error, response) {
  if (error.message.includes('ENOENT')) {
    console.error(`asset not found ${error.stack}`)
    response.writeHead(404)
    return response.end()
  }

  console.error(`caught error on API ${error.stack}`)
  response.writeHead(500)
  return response.end()
}

export function handler (request, response) {
  const { method, url } = request
  const httpResource = `${method}:${url}`

  if (routes[httpResource]) {
    return routes[httpResource](request, response)
      .catch(error => handleError(error, response))
  }

  if (/^\/run/.test(url)) {
    return routes['GET:/run'](request, response)
      .catch(error => handleError(error, response))
  }

  return routes['GET:/assets'](request, response)
    .catch(error => handleError(error, response))
}
