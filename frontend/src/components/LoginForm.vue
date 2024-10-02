<template>
  <div class="principal">
    <h2>Login</h2>
    <form @submit.prevent="enviarForm">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" placeholder="Seu email" required>
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input id="password" v-model="password" type="password" placeholder="Sua senha" required>
        <a href="#" @click.prevent="$emit('forgotPassword')">Esqueceu a senha?</a>
      </div>
      <button type="submit" class="btn">Entrar</button>
    </form>
    <div class="links">
      <p>Ainda não possui conta?</p>
      <a href="#" @click.prevent="$emit('goToRegister')">Cadastre-se</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const enviarForm = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      router.push('/login');
    } else {
      alert(data.msg);
    }
  } catch (error) {
    console.error('Erro no servidor:', error);
  }
}
</script>

<style scoped>
@import url(../styles/loginform.css);
</style>
