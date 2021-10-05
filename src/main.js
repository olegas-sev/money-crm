import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import Loader from '@/components/app/Loader'

// Directives
import tooltipDirective from '@/directives/tooltip.directive'

// Filters
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'

// CSS
import 'materialize-css/dist/js/materialize.min'
// Firebase imports
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyAgJ-Sa8adJd3u_Bl5xXyVR68QuWb7FRTA",
  authDomain: "vue-money-crm-nti.firebaseapp.com",
  databaseURL: "https://vue-money-crm-nti-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-money-crm-nti",
  storageBucket: "vue-money-crm-nti.appspot.com",
  messagingSenderId: "1031633041767",
  appId: "1:1031633041767:web:94901a5db54ec3309dd7c2",
  measurementId: "G-87VRRXZWT0"
})


let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


