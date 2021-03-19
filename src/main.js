import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

// 解决移动端300毫秒延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

// 图片懒加载
// import VueLazyLoad from 'vue-lazyload'
// app.use(VueLazyLoad)


