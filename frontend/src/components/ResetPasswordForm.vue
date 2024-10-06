<template>
  <div>
    <h2 v-if="!isTokenValid">Validação de Token</h2>
    <h2 v-if="isTokenValid">Redefinir Senha</h2>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group" v-if="!isTokenValid">
        <label for="token">Código de Validação</label>
        <input id="token" v-model="token" type="text" maxlength="6" required placeholder="Digite o código de 6 dígitos">
      </div>

      <div class="form-group" v-if="isTokenValid">
        <label for="newPassword">Nova senha</label>
        <input id="newPassword" v-model="newPassword" type="password" placeholder="Digite a nova senha" required>
        <p></p>
        <label for="confirmPassword">Repita a senha</label>
        <input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Repita a nova senha" required>
      </div>
      
      <button type="submit" class="btn">{{ isTokenValid ? 'Redefinir Senha' : 'Validar Código' }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const token = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const isTokenValid = ref(false);

const handleSubmit = async () => {
  if (!isTokenValid.value) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/validate-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetToken: token.value }),
      });

      if (!response.ok) {
        alert('Código de validação inválido');
        return;
      }

      isTokenValid.value = true;
    } catch (error) {
      console.error('Erro no servidor:', error);
    }
  } else {
    if (newPassword.value !== confirmPassword.value) {
      alert('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetToken: token.value, newPassword: newPassword.value }),
      });

      if (!response.ok) {
        alert('Erro ao redefinir senha');
        return;
      }
      alert('Senha redefinida com sucesso');
      router.push('/login'); 
    } catch (error) {
      console.error('Erro no servidor:', error);
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>
