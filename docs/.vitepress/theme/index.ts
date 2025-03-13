import { globals } from "../vitepress";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

console.log(DefaultTheme);
 
const define = <T>(value: T): T => value;

// 添加重新加载页面的函数
const reloadContent = () => {
  console.log('123 - 检测到内容更新失败');
  setTimeout(() => {
    window.location.reload();
  }, 0);
};

// 全局错误处理 (直接写死这个臭vitepress错误，捕获住直接刷新页面)
window.onerror = function(msg, url, line, column, error) {
  if (error && error.toString().includes("Cannot read properties of null (reading 'type')")) {
    console.log('123 - window.onerror 捕获到错误');
    reloadContent();
    return true;
  }
};
// 全局错误处理 (直接写死这个臭vitepress错误，捕获住直接刷新页面)
window.onunhandledrejection = function(event) {
  if (event.reason && event.reason.toString().includes("Cannot read properties of null (reading 'type')")) {
    console.log('123 - onunhandledrejection 捕获到错误');
    event.preventDefault();
    reloadContent();
    return true;
  }
};


export default define<Theme>({
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
   
    // 路由钩子：在路由切换前(破钩子，官网上都没这个，翻源码找到的)
    router.onBeforeRouteChange = (to) => {
      console.log('路由即将切换到:', to);
    };


    // 应用初始化钩子(破钩子，官网上都没这个，翻源码找到的)
    app.provide('appInitialized', true);
    
    // 数据更新钩子
    app.config.globalProperties.$onContentUpdated = (callback) => {
      // 创建一个自定义事件用于内容更新通知
      const eventBus = {
        listeners: new Set(),
        emit() {
          this.listeners.forEach(listener => listener());
        },
        on(callback) {
          this.listeners.add(callback);
          return () => this.listeners.delete(callback);
        }
      };
      
      return eventBus.on(callback);
    };
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp);
    });
  },
});