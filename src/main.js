import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/assets/css/tailwind.css' // Tailwind css
import './icons' // icon
import './permission' // permission control
import _ from 'lodash'

import '@/components'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import AppView from '@/components/AppView'
import Paginate from 'vuejs-paginate'
import Vuelidate from 'vuelidate'
import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'
Vue.component('scrollbar', vueCustomScrollbar)
Vue.component('app-view', AppView)
Vue.component('paginate', Paginate)
Vue.use(Loading)
Vue.use(Vuelidate)
Vue.use(Toast, {})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
