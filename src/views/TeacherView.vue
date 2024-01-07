<script setup>
import LeftMenuTeacher from '../components/teacher/LeftMenuTeacher.vue'
import RightMenu from '../components/main/RightMenu.vue'
import ContentTeacher from '../components/teacher/ContentTeacher.vue'
import HeadMenu from "../components/main/HeadMenu.vue";

import axiosClient from "../api.js";
import axios from 'axios'

import {useAuthStore} from '../stores/user-store';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter} from 'vue-router'

let router = useRouter()
const user = useAuthStore();
//let user = JSON.parse(localStorage.getItem('user'))

let subjects = ref([])
let courses = ref([])
let errored = ref(false)
let loading = ref(false)
let notify = ref([])
onMounted(() => {
    if(user.userInfo.role_id != 3){
        router.push('/login')
    }

    loading.value = true
    axiosClient
        .get(`/teacher`)
        .then(response => {
            subjects = response.data.data.subjects;
            courses = response.data.data.courses;
            console.log(response.data.data)
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
                <LeftMenuTeacher />
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
                            <ContentTeacher :subjects=subjects />
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