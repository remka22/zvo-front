<script setup>
import LeftMenuMetodist from '../components/metodist/LeftMenuMetodist.vue'
import RightMenu from '../components/main/RightMenu.vue'
import ContentMetodist from '../components/metodist/ContentMetodist.vue'
import HeadMenu from "../components/main/HeadMenu.vue";

import axiosClient from "../api.js";

import { useAuthStore } from '../stores/user-store';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'

let router = useRouter()
const user = useAuthStore();
//let user = JSON.parse(localStorage.getItem('user'))

let groups = ref([])
let errored = ref(false)
let loading = ref(false)



onMounted(() => {
    if (user.userInfo.role_id != 4) {
        router.push('/login')
    }

    loading.value = true
    axiosClient
        .get(`/metodist`)
        .then(response => {
            groups = response.data[0].get_metodists_groups;
            console.log(response.data[0])
        })
        .catch(error => {
            console.log(error);
            errored.value = true;
        })
        .finally(() => {
            loading.value = false
        });
})


</script>


<template>
    <HeadMenu></HeadMenu>
    <div class="conteiner">
        <div class="row">

            <div class="col-2">
                <div class="container  ">
                    <LeftMenuMetodist />
                </div>
            </div>

            <div class="col gy-2">
                <div class="row  ">
                    <div class="container text-center ">
                        Ваш методист: ФИО, Почта
                    </div>
                </div>

                <div class="row ">

                    <div class="container ">
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
                                <ContentMetodist :groups=groups />
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div class="col-2">
                <div class="container">
                    <RightMenu />
                </div>
            </div>
        </div>
    </div>
</template>
  
<style></style>