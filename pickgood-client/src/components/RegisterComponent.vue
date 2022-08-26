<script lang="ts" setup>
import { AxiosError } from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification'
import AuthService from '../services/AuthService';

const emit = defineEmits<{
  (event: 'gotoLogin'): void
}>()

const lastName = ref('')
const firstName = ref('')
const pwd = ref('')

const login = async () => {
  try {
    await AuthService.register({ firstName: firstName.value, lastName: lastName.value, pwd: pwd.value })
    useToast().success('Registration successful.')
    emit('gotoLogin')
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.data?.errors?.length > 0) {
        for (const e of err.response?.data.errors) {
          const { param, msg } = e
          useToast().error(`The value for ${param === 'pwd' || param === 'password' ? 'password' : param === 'firstName' ? 'First name' : 'Last name'} is invalid.`)
        }
      } else if (err.response?.data?.error) {
        useToast().error(err.response?.data?.error, {
          duration: 10 * 1000
        })
      }
    }
  }
}

const gotoLogin = () => {
  emit('gotoLogin')
}
</script>

<template>
  <div class="container container-login">
    <h2>Register</h2>
    <form @submit.prevent="login" class="form-login">
      <label for="firstname">First name: </label>
      <input type="text" v-model="firstName" name="firstname" autocomplete="given-name" />
      <label for="lastname">Last name: </label>
      <input type="text" v-model="lastName" name="lastname" autocomplete="family-name" />
      <label for="pwd">Password: </label>
      <input type="password" v-model="pwd" name="pwd" autocomplete="new-password" />
      <button type="submit" class="submit-button">
        Submit
      </button>
    </form>

    <a class="clickable" @click="gotoLogin">Login instead</a>
  </div>
</template>

<style scoped>
.submit-button {
  border-radius: 1rem;
  height: 3rem;
}

.container-login {
  margin: auto;
  margin-top: 2rem;
}

.form-login {
  margin: auto;
  max-width: 500px;
  display: grid;
  grid-template-columns: [content-start] 1fr 2fr [content-end];
}

.form-login>* {
  padding: 0.5rem;
  margin: 0.5rem;
}

.form-login>.submit-button {
  grid-column: content;
}

.form-login>input {
  border: 1px solid gray;
  border-radius: 0.5rem;
}
</style>