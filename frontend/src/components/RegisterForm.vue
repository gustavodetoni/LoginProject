<template>
  <div class="form-container">
    <h2>Cadastro</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group col">
          <label for="username">Nome de usuário</label>
          <input 
            id="username" 
            v-model="username" 
            type="text" 
            placeholder="Escolha um nome de usuário"
            :class="{ 'is-invalid': submitted && errors.username }"
          >
          <div v-if="submitted && errors.username" class="error-message">{{ errors.username }}</div>
        </div>
        <div class="form-group col">
          <label for="fullName">Nome completo</label>
          <input 
            id="fullName" 
            v-model="fullName" 
            type="text" 
            placeholder="Seu nome completo"
            :class="{ 'is-invalid': submitted && errors.fullName }"
          >
          <div v-if="submitted && errors.fullName" class="invalid-feedback">{{ errors.fullName }}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label for="birthDate">Data de nascimento</label>
          <input 
            id="birthDate" 
            v-model="birthDate" 
            type="date"
            :class="{ 'is-invalid': submitted && errors.birthDate }"
          >
          <div v-if="submitted && errors.birthDate" class="invalid-feedback">{{ errors.birthDate }}</div>
        </div>
        <div class="form-group col">
          <label for="phone">Telefone</label>
          <input 
            id="phone" 
            v-model="phone" 
            type="tel" 
            placeholder="Seu telefone"
            :class="{ 'is-invalid': submitted && errors.phone }"
          >
          <div v-if="submitted && errors.phone" class="invalid-feedback">{{ errors.phone }}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label for="email">Email</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            placeholder="Seu email"
            :class="{ 'is-invalid': submitted && errors.email }"
          >
          <div v-if="submitted && errors.email" class="invalid-feedback">{{ errors.email }}</div>
        </div>
        <div class="form-group col">
          <label for="emailConfirmation">Confirmar Email</label>
          <input 
            id="emailConfirmation" 
            v-model="emailConfirmation" 
            type="email" 
            placeholder="Confirme seu email"
            :class="{ 'is-invalid': submitted && errors.emailConfirmation }"
          >
          <div v-if="submitted && errors.emailConfirmation" class="invalid-feedback">{{ errors.emailConfirmation }}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label for="password">Senha</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            placeholder="Escolha uma senha"
            :class="{ 'is-invalid': submitted && errors.password }"
          >
          <div v-if="submitted && errors.password" class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <div class="form-group col">
          <label for="passwordConfirmation">Confirmar Senha</label>
          <input 
            id="passwordConfirmation" 
            v-model="passwordConfirmation" 
            type="password" 
            placeholder="Confirme sua senha"
            :class="{ 'is-invalid': submitted && errors.passwordConfirmation }"
          >
          <div v-if="submitted && errors.passwordConfirmation" class="invalid-feedback">{{ errors.passwordConfirmation }}</div>
        </div>
      </div>
      <div class="button-group">
        <button  class="btn back-btn" @click="goToLogin">Voltar para Login</button>
        <button type="submit" class="btn submit-btn">Cadastrar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
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

const errors = reactive({
  username: '',
  fullName: '',
  birthDate: '',
  phone: '',
  email: '',
  emailConfirmation: '',
  password: '',
  passwordConfirmation: ''
})

const submitted = ref(false)

const validateForm = () => {
  let isValid = true

  if (username.value.trim() === '') {
    errors.username = 'Nome de usuário é obrigatório.'
    isValid = false
  } else {
    errors.username = ''
  }

  if (fullName.value.trim() === '') {
    errors.fullName = 'Nome completo é obrigatório.'
    isValid = false
  } else {
    errors.fullName = ''
  }

  if (birthDate.value.trim() === '') {
    errors.birthDate = 'Data de nascimento é obrigatória.'
    isValid = false
  } else {
    errors.birthDate = ''
  }

  if (phone.value.trim() === '') {
    errors.phone = 'Telefone é obrigatório.'
    isValid = false
  } else {
    errors.phone = ''
  }

  if (email.value.trim() === '') {
    errors.email = 'Email é obrigatório.'
    isValid = false
  } else {
    errors.email = ''
  }

  if (email.value !== emailConfirmation.value) {
    errors.emailConfirmation = 'Emails não coincidem.'
    isValid = false
  } else {
    errors.emailConfirmation = ''
  }

  if (password.value.trim() === '') {
    errors.password = 'Senha é obrigatória.'
    isValid = false
  } else {
    errors.password = ''
  }

  if (password.value !== passwordConfirmation.value) {
    errors.passwordConfirmation = 'Senhas não coincidem.'
    isValid = false
  } else {
    errors.passwordConfirmation = ''
  }

  return isValid
}

const handleSubmit = async () => {
  submitted.value = true
  if (!validateForm()) {
    return
  }

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
        fullName: fullName.value,
        phone: phone.value,
        birthDate: birthDate.value,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      alert('Cadastro realizado com sucesso!')
      router.push('/login')
    } else {
      alert(data.msg)
    }
  } catch (error) {
    console.error('Erro no servidor:', error)
    alert('Ocorreu um erro no servidor. Tente novamente mais tarde.')
  }
}

const goToLogin = () => {
  router.push('/login')
}

</script>

<style scoped>
@import url(../styles/registerform.css);
</style>
