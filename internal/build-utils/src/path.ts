import { resolve } from 'node:path'

export const projRoot = resolve(__dirname, '..', '..', '..')

// Docs
export const docsDirName = 'docs'
export const docRoot = resolve(projRoot, docsDirName)
