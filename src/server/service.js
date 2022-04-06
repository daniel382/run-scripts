import fs from 'fs'
import fsPromise from 'fs/promises'
import path from 'path'

import { config } from './config.js'

export class Service {
  async getFileInfo (filename) {
    const fullFilePath = path.join(config.dir.publicDirectory, filename)

    await fsPromise.access(fullFilePath)

    const fileType = path.extname(fullFilePath)

    return { type: fileType, name: fullFilePath }
  }

  createFileStream (filename) {
    return fs.createReadStream(filename)
  }

  async getFileStream (filename) {
    const { name, type } = await this.getFileInfo(filename)

    return {
      stream: this.createFileStream(name),
      type
    }
  }
}
