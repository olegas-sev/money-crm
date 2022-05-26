<template>
  <form @submit.prevent="submitHandler" class="card auth-card">
    <div class="card-content">
      <span class="card-title">Dashboard register</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email)
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >Email field shouldn't be empty</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
          >Enter correct Email!</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength)
          }"
        />
        <label for="password">Password</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >Password field shouldn't be empty.</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          >Password fields should be at least
          {{ $v.password.$params.minLength.min }} characters long. Now it's
          {{ password.length }}.</small
        >
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="name">Name</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >Please enter the name.</small
        >
      </div>
      <div class="input-field">
        <input
          id="bill"
          type="number"
          v-model.trim="bill"
          :class="{
            invalid:
              ($v.bill.$dirty && !$v.bill.required) ||
              ($v.bill.$dirty && !$v.bill.minValue)
          }"
        />
        <label for="bill">Bank balance</label>
        <small class="helper-text"
          >Please note that you can't change your bank balance later.</small
        >
        <small
          class="helper-text invalid"
          v-if="$v.bill.$dirty && !$v.bill.required"
          >Please enter an amount.</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.bill.$dirty && !$v.bill.minValue"
          >Bank balance should be at least
          {{ $v.bill.$params.minValue.min }} kr. Now it's {{ bill }}.</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>I agree with Terms & Conditions</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Sign up
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Already have an account?
        <router-link to="/login">Sing in</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength, minValue } from 'vuelidate/lib/validators'
export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    bill: 0,
    agree: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    bill: { required, minValue: minValue(1) },
    agree: { checked: v => v }
  },
  mounted() {
    M.updateTextFields()
    // Updates inputs and removes placeholder bug where value is rendered before Materialize is initialized
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        bill: this.bill
      }
      await this.$store.dispatch('register', formData)

      this.$router.push('/')
    }
  }
}
</script>
