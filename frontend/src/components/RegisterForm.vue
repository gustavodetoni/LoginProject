<template>
  <div class="form-container">
    <h2>Cadastro</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group col">
          <label for="username">Nome de usuário</label>
          <input id="username" v-model="username" type="text" placeholder="Escolha um nome de usuário" required>
        </div>
        <div class="form-group col">
          <label for="fullName">Nome completo</label>
          <input id="fullName" v-model="fullName" type="text" placeholder="Seu nome completo" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label for="birthDate">Data de nascimento</label>
          <input id="birthDate" v-model="birthDate" type="date" required>
        </div>
        <div class="form-group col">
          <label for="phone">Telefone</label>
          <input id="phone" v-model="phone" type="tel" placeholder="Seu telefone" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="Seu email" required>
        </div>
        <div class="form-group col">
          <label for="emailConfirmation">Confirmar Email</label>
          <input id="emailConfirmation" v-model="emailConfirmation" type="email" placeholder="Confirme seu email" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label for="password">Senha</label>
          <input id="password" v-model="password" type="password" placeholder="Escolha uma senha" required>
        </div>
        <div class="form-group col">
          <label for="passwordConfirmation">Confirmar Senha</label>
          <input id="passwordConfirmation" v-model="passwordConfirmation" type="password" placeholder="Confirme sua senha" required>
        </div>
      </div>
      <div class="password-strength">
        Força da senha: {{ passwordStrength }}
      </div>
      <div class="button-group">
        <button type="button" class="btn back-btn" @click="goToLogin">Voltar para Login</button>
        <button type="submit" class="btn submit-btn" :disabled="!isFormValid">Cadastrar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const fullName = ref('')
const birthDate = ref('')
const phone = ref('')
const email = ref('')
const emailConfirmation = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const router = useRouter()

const passwordStrength = computed(() => {
  const pwd = password.value
  if (pwd.length < 8) return 'Fraca'
  if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.match(/[^a-zA-Z0-9]/)) return 'Forte'
  return 'Média'
})

const isFormValid = computed(() => {
  return username.value &&
    fullName.value &&
    birthDate.value &&
    phone.value &&
    email.value &&
    email.value === emailConfirmation.value &&
    password.value &&
    password.value === passwordConfirmation.value &&
    passwordStrength.value !== 'Fraca'
})

const handleSubmit = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        fullName: fullName.value,
        email: email.value,
        phone: phone.value,
        birthDate: birthDate.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Cadastro realizado com sucesso!');
      router.push('/login');  
    } else {
      alert(data.msg);  
    }
  } catch (error) {
    console.error('Erro no servidor:', error);
    alert('Ocorreu um erro no servidor. Tente novamente mais tarde.');
  }
}

const goToLogin = () => {
  window.location.href = '/home';
}
</script>

<style scoped>
@import url(../styles/registerform.css);
</style>
