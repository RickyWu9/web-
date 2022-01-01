import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import axios from 'axios'
Vue.prototype.$axios = axios
import TextHighlight from 'vue-text-highlight';

Vue.component('text-highlight', TextHighlight);
