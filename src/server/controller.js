import util from 'util'
import { exec } from 'child_process'

import { Service } from './service.js'

const run = util.promisify(exec)

export class Controller {
  constructor () {
    this.service = new Service()
  }

  async getFileStream (filename) {
    return this.service.getFileStream(filename)
  }

  async runScript (script) {
    const { stderr, stdout } = await run(`bash ${script}`)
    if (stderr) {
      throw new Error(stderr)
    }

    return stdout
  }
}
