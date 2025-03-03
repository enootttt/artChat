// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

const define = <T>(value: T): T => value
export default define<Theme>({
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
})
