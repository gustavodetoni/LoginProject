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
        <Home v-if="currentView === 'home'" />
        <h2>Bem-vindo!</h2>
        <button @click="handleLogout" class="btn btn-logout">Sair</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import ForgotPasswordForm from './components/ForgotPasswordForm.vue';
import ResetPasswordForm from './components/ResetPasswordForm.vue';
import Home from './components/Home.vue';

const router = useRouter();
const currentView = ref('login');
const loggedIn = ref(false);

const handleLogin = async (email, password) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      loggedIn.value = true;  
      currentView.value = 'home';
      router.push('/home'); 
    } else {
      alert(data.msg);
    }
  } catch (error) {
    console.error('Erro no servidor:', error);
  }
};

const handleLogout = () => {
  localStorage.removeItem('token');
  loggedIn.value = false;
  currentView.value = 'login'; 
  router.push('/login');
};

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    loggedIn.value = true; 
    currentView.value = 'home'; 
    router.push('/home'); 
  }
});
</script>

<style scoped>

</style>
