<template>
  <div class="home">
    <h1>Bem-vindo!</h1>
    <div v-if="loggedIn">
        <button @click="handleLogout" class="btn btn-logout">Sair</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loggedIn = ref(false);

const handleLogout = () => {
  localStorage.removeItem('token');
  loggedIn.value = false;
  router.push('/login');
};

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    loggedIn.value = true;
    router.push('/home');
  } else {
    router.push('/login');
  }
});
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
}
</style>
