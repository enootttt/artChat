// https://vitepress.dev/guide/custom-theme
import { globals } from "../vitepress";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

const define = <T>(value: T): T => value;
export default define<Theme>({
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp);
    });
  },
});
