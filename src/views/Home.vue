<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Balance' | localize }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-if="isProd" class="row">
      <p>
        <a href="https://fixer.io/" target="_blank">Fixer API</a> does not allow
        use of their API for production projects, therefore you can not really
        see home view panels.
      </p>
      <p>
        However, you are welcome to view other tabs instead since they work just
        since they are not related to Fixer API :).
      </p>
    </div>
    <div v-else class="row">
      <HomeBill :rates="currency.rates" />

      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  name: 'home',
  data: () => ({
    loading: true,
    currency: null,
    isProd: process.env.NODE_ENV !== 'development'
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    // console.log(this.currency.rates);
    this.loading = false
  },
  methods: {
    async refresh() {
      console.log('Reload...')
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
      console.log('Reloading completed.')
    }
  },
  components: {
    HomeBill,
    HomeCurrency
  }
}
</script>
