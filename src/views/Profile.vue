<template>
  <div>
    <div class="page-title">
      <h3>{{'Profile_Title' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required
          }"
        />
        <label for="description">{{'Name' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{'Message_EnterName' | localize}}</small
        >
      </div>
      <div class="input-field">
        <select ref="select" v-model="locale">
          <option value="en-US">English</option>
          <option value="se-SE">Swedish</option>
          <option value="ru-RU">Russian</option>
        </select>
        <label>{{'Choose_Language' | localize}}</label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Update_Button' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<style scoped>
.input-field {
  margin-bottom: 2rem;
}
</style>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'profile',
  data: () => ({
    name: '',
    locale: 'en-US'
  }),
  validations: {
    name: { required }
  },
  computed: {
    ...mapGetters(['info'])
  },
  created() {
    if (this.info.locale) {
      this.locale = this.info.locale
    }
  },
  async mounted() {
    this.name = this.info.name

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      // console.log(this.$v.password);
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.locale
        })
      } catch (e) {}
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
