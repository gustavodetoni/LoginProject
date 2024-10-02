<template>
  <div>
    <h2>Cadastro</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Nome de usuário</label>
        <input id="username" v-model="username" type="text" placeholder="Escolha um nome de usuário" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" placeholder="Seu email" required>
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input id="password" v-model="password" type="password" placeholder="Escolha uma senha" required>
      </div>
      <button type="submit" class="btn">Cadastrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const emailConfirmation = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const fullName = ref('')
const birthDate = ref('')
const phone = ref('')
const router = useRouter()

const passwordStrength = computed(() => {
  const pwd = password.value
  if (pwd.length < 8) return 'Fraca'
  if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.match(/[^a-zA-Z0-9]/)) return 'Forte'
  return 'Média'
})

const isFormValid = computed(() => {
  return username.value &&
    email.value &&
    email.value === emailConfirmation.value &&
    password.value &&
    password.value === passwordConfirmation.value &&
    fullName.value &&
    birthDate.value &&
    phone.value &&
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
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
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
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 500;
}

.password-strength {
  margin-top: 5px;
  font-size: 14px;
  color: var(--secondary-color);
  font-weight: 500;
}

.links {
  text-align: center;
  margin-top: 1rem;
}
</style>