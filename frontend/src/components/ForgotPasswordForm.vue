<template>
  <div>
    <h2>Esqueceu a Senha</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <p>Digite o seu email de login</p>
        <p>Você receberá um email com um Token que sera validado para redefinição de senha</p>
        <input id="email" v-model="email" type="email" placeholder="Seu email" required>
        <router-link to="/login">Voltar</router-link>
      </div>
      <button type="submit" class="btn" @click="goToResetPassword">Enviar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')

const handleSubmit = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value }),
    });

    if (!response.ok) {
      alert('Erro ao enviar email');
    }
  } catch (error) {
    console.error('Erro no servidor:', error);
  }
}

const goToResetPassword = () => {
  router.push('/reset-password')
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>
