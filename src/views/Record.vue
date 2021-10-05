<template>
  <div>
    <div class="page-title">
      <h3>New record</h3>
    </div>

    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length" >No categories were found. Please <router-link to="/categories">add one</router-link>.</p>
    <form class="form" v-else @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id"
          :value="c.id">{{c.title}}</option>
        </select>
        <label>Choose a category</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>Income</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>Outcome</span>
        </label>
      </p>

      <div class="input-field">
        <input 
        id="amount" 
        type="number" 
        v-model.number="amount" 
        :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"/>
        <label for="amount">Amount</label>
        <span
        class="helper-text invalid"
        v-if="$v.amount.$dirty && !$v.amount.minValue"
        >
        Please enter the amount you want of {{type}}
        </span>
      </div>

      <div class="input-field">
        <input 
        id="description" 
        type="text" 
        v-model="description"
        :class="{invalid: $v.description.$dirty && !$v.description.required}"/>
        <label for="description">Description</label>
        <span
        class="helper-text invalid"
        v-if="$v.description.$dirty && !$v.description.required"
        >
        Please enter the description
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Create
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators"
import {mapGetters} from 'vuex'

export default {
  name: 'record',
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 0,
    description: '',
  }),
  validations: {
    amount: {minValue: minValue(1)},
    description: {required},
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    console.log('lol', this.categories);
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select);
        M.updateTextFields()
    }, 0)

  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.typ === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async handleSubmit() { 
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON()
          })
          const bill = this.type === 'income' 
          ? this.info.bill + this.amount 
          : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Record was successfully created.')
          this.$v.$reset()
          this.amount = 0
          this.description = ''
        } catch (e) {}      
      } else {
        this.$message(`No enough money on your account (${this.amount - this.info.bill})`)
      }
    }
  },
  destroyed() {
      if (this.select && this.select.destroy) {
          this.select.destroy();
      }
    },
}
</script>