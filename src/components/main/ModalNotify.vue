<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
defineProps({
    notify: Object
})
</script>

<template>
    <div class="modal fade" v-bind:id="'exampleModal' + notify.id" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ notify.user_rec_fio }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                </div>
                <div class="modal-body">
                    {{ notify.content }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('showIt', notify.id)">Прочитано</button>
                </div>
            </div>
        </div>
    </div>
</template>