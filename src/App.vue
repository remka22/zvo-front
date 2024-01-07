<script setup>
import { useAuthStore } from './stores/user-store';
import { ref, onMounted, watch } from 'vue';

const user = useAuthStore();
const syncToken = async () => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  if (token) {
    user.userInfo.token = token
    await user.user()
  }
}

syncToken()


</script>

<template>
  <div v-if="user.loader" class="d-flex justify-content-center">
    <div class="spinner-border text-info" role="status">
      <span class="visually-hidden">Загрузка...</span>
    </div>.
  </div>
  <RouterView v-else />
</template>

<!-- <div class="col-10">
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
  <RouterLink to="/director">Director</RouterLink>
  <RouterLink to="/login">Login</RouterLink>
</div>
<div class="col-1 d-flex justify-content-end">
  <a href="#" @click="logout">logout</a>
</div> -->

<style scoped></style>
./stores/user./stores/user-store