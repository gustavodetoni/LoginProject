<template>
<div id="app">
    <div class="container">
      <div v-if="!loggedIn">
        <div v-if="currentView === 'login'">
          <LoginForm @login="handleLogin" @forgotPassword="currentView = 'forgotPassword'" @goToRegister="currentView = 'register'" />
        </div>
        <div v-else-if="currentView === 'register'">
          <RegisterForm @goToLogin="currentView = 'login'" />
        </div>
        <div v-else-if="currentView === 'forgotPassword'">
          <ForgotPasswordForm @goToLogin="currentView = 'login'" @verifyCode="currentView = 'resetPassword'" />
        </div>
        <div v-else-if="currentView === 'resetPassword'">
          <ResetPasswordForm @passwordReset="currentView = 'login'" />
        </div>
      </div>
      <div v-else class="logged-in">
        <h2>Bem-vindo!</h2>
        <button @click="handleLogout" class="btn btn-logout">Sair</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import ForgotPasswordForm from './components/ForgotPasswordForm.vue'
import ResetPasswordForm from './components/ResetPasswordForm.vue'


const currentView = ref('login')
const loggedIn = ref(false)

const handleLogin = () => {
  loggedIn.value = true
}

const handleLogout = () => {
  loggedIn.value = false
  currentView.value = 'login'
}
</script>

<style scoped>

</style>
