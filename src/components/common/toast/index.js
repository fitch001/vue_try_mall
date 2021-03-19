import Toast from "./Toast.vue"
import {
  provide,
  reactive,
  ref,
  createApp
} from 'vue'



export default {
  install(vue) {


    // console.log(app);
    const app = createApp({})
    app.config.globalProperties.$toast = Toast => {
      return Toast
    }
    app.component("toast", {
      template: Toast,
    }).mount(document.createElement('div'))

    app.directive('focus', {
      mounted: el => el.focus()
    })
    // 1. 创建组件构造器
    // const toastConstructor = createApp(Toast).component("toast", {})
    // 2. new 的方式根据组件构造器创建一个组件对象
    // const toast = new toastConstructor()
    // 3. 将这个组件对象手动挂载到某一个元素上
    // toast.$mount(document.createElement('div'))
    // 4. toast.$el 对应的就是div
    // document.body.appendChild(app.$el)
    console.log(app);

  }
}
