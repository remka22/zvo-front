<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
defineProps({
    groups: Array
})
</script>




<template>
    <ul class="list-group">
        <li v-for="g in groups" class="list-group-item">{{ g.short_name }}</li>
    </ul>
</template>




<style scoped></style>
