import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueNotify from 'vue-notifyjs'
import 'vue-notifyjs/themes/default.css'
import store from './store'
// Axios for making API calls
import axios from './backend/vue-axios'
// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'
// router setup
import routes from './routes/routes'
import VueGoodTable from 'vue-good-table'
// import the styles
import 'vue-good-table/dist/vue-good-table.css'

// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(VueNotify)
Vue.use(VueGoodTable)

// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  axios,
  store
})
