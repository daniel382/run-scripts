import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const currentDir = dirname(fileURLToPath(import.meta.url))

const root = resolve(currentDir, '..', '..')
const publicDirectory = resolve(root, 'public')

export const config = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '127.0.0.1',
  dir: {
    root,
    publicDirectory,
  },
  pages: {
    homeHTML: 'index.html'
  },
  constants: {
    CONTENT_TYPE: {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.gif': 'image/gif',
      '.png': 'image/png',
      '.jpeg': 'image/jpeg',
      '.jpg': 'image/jpeg',
      '.bmp': 'image/bmp',
      '.webp': 'image/webp'
    }
  }
}
