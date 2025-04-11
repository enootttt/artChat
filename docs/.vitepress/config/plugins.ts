import type MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import createDemoContainer from '../plugins/demo'

export function mdPlugin(md: MarkdownIt) {
  md.use(mdContainer, 'demo', createDemoContainer(md))
}
