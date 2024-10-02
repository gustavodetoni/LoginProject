<template>
  <div>
    <h2>Redefinir Senha</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="newPassword">Nova senha</label>
        <input id="newPassword" v-model="newPassword" type="password" placeholder="Digite a nova senha" required>
      </div>
      <button type="submit" class="btn">Redefinir Senha</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newPassword = ref('')

const handleSubmit = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword: newPassword.value }),
    });

    if (!response.ok) {
      alert('Erro ao redefinir senha');
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
