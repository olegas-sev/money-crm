import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=f005207e9124df9f4ebb029c76d87560&symbols=USD,EUR,SEK`)
      return await res.json()
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info
  }
})
