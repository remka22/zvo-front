<script setup>
import LeftMenuDirector from '../components/director/LeftMenuDirector.vue'
import RightMenu from '../components/main/RightMenu.vue'
import ContentDirector from '../components/director/ContentDirector.vue'
import HeadMenu from "../components/main/HeadMenu.vue";

import axiosClient from "../api.js";
import axios from 'axios'

import {useAuthStore} from '../stores/user-store';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter} from 'vue-router'

let router = useRouter()
const user = useAuthStore();
//let user = JSON.parse(localStorage.getItem('user'))

let metodists = ref([])
let groups = ref([])
let errored = ref(false)
let loading = ref(false)
let notify = ref([])
onMounted(() => {
    if(user.userInfo.role_id != 5){
        router.push('/login')
    }

    loading.value = true
    axiosClient
        .get(`/director`)
        .then(response => {
            metodists = response.data.metodists;
            groups = response.data.groups;
            console.log(response.data)
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
    <div class="row">

        <div class="col-2">
            <div class="container  ">
                <LeftMenuDirector />
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
                            <ContentDirector :metodists=metodists />
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
</template>
  
<style></style>
  ../stores/axios-client.js../api.js../stores/user../stores/user-store