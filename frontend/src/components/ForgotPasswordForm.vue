<template>
  <div>
    <h2>Esqueceu a Senha</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" placeholder="Seu email" required>
      </div>
      <button type="submit" class="btn">Enviar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>
