<script setup>
import ModalNotify from './ModalNotify.vue'
import { ref, onMounted, onBeforeMount } from 'vue';
import axiosClient from "../../api.js";

let errored = ref(false)
let loading = ref(false)
let notify = ref([])

onMounted(() => {
   loadNotify()
})

const loadNotify = () => {
   loading.value = true
   axiosClient
      .get(`/notify`)
      .then(response => {
         notify = response.data;
         console.log(response.data)
      })
      .catch(error => {
         console.log(error);
         errored.value = true;
      })
      .finally(() => {
         loading.value = false
      });
}

const showItNotify = (id) => {
   axiosClient
      .put(`/notify`,{
         notify_id: id
      })
      .then(response => {
         console.log('notify showit')
      })
      .catch(error => {
         console.log(error);
      })
}

const showit = (id) => {
   showItNotify(id)
   loadNotify()
}
</script>




<template>
   <div class="row gy-2">
      <button type="button " class="btn btn-info "> Уведомления</button>
   </div>
   <div v-if="errored">
      <div class="alert alert-danger" role="alert">
         Ошибка запроса данных! Повторите попытку позже...
      </div>
   </div>
   <div v-else>
      <div v-if="loading" class="d-flex justify-content-center">
         <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Загрузка...</span>
         </div>.
      </div>
      <div v-else>
         <div v-for="n in notify" class="d-flex justify-content-center">
            <div v-on:click="" class="card text-dark bg-light mt-1" style="max-width: 18rem;">
               <h6 class="card-header">{{ n.user_rec_fio }}</h6>
               <div class="card-body" data-bs-toggle="modal" v-bind:data-bs-target="'#exampleModal' + n.id">
                  <!-- <h5 class="card-title"></h5> -->
                  <p class="card-text">{{ n.content }}</p>
               </div>
            </div>
            <ModalNotify :notify=n @show-it="showit($event)"></ModalNotify>
         </div>
      </div>
   </div>
</template>




<style scoped></style>
