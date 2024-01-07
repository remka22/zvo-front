<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
defineProps({
    subjects: Array,
    courses: Array
})
</script>




<template>
    <ul class="list-group">
        <li v-for="s in subjects" class="list-group-item">{{ s.name }} - {{ s.short_name }}</li>
    </ul>
</template>




<style scoped></style>
