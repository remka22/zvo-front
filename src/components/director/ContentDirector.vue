<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
defineProps({
    metodists: Array
})
</script>




<template>
    <ul class="list-group">
        <li v-for="m in metodists" class="list-group-item">{{ m.fio }}</li>
    </ul>
</template>




<style scoped></style>
