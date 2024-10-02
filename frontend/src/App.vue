<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>

</style>
