import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI)
Vue.config.productionTip = false

new Vue({
  router, 
  store,  //vue中所有组件都可以使用this.$store访问到此数据仓库
  render: h => h(App)
}).$mount('#app')
