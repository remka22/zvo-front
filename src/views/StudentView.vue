<script setup>
import RightMenu from '../components/main/RightMenu.vue'
import HeadMenu from "../components/main/HeadMenu.vue";
import LeftMenuStudent from '@/components/student/LeftMenuStudent.vue';
import ContentStudent from '@/components/student/ContentStudent.vue';

import {useAuthStore} from '../stores/user-store';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter} from 'vue-router'
import axiosClient from "../api.js";


let router = useRouter()
const user = useAuthStore();
//let user = JSON.parse(localStorage.getItem('user'))

let subjects = ref([])
let group = ref([])
let errored = ref(false)
let loading = ref(false)
let notify = ref([])
onMounted(() => {
    if(user.userInfo.role_id != 2){
        router.push('/login')
    }

    loading.value = true
    axiosClient
        .get(`/student`)
        .then(response => {
            subjects = response.data.subjects;
            group = response.data.group;
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
                <LeftMenuStudent />
            </div>
        </div>

        <div class="col gy-2">
            <div class="row  ">
                <div class="container text-center ">
                    Ваш методист: {{group.metodist_fio}}, {{ group.metodist_email }}
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
                            <ContentStudent :subjects=subjects />
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div class="col-2">
            <div class="container ">
                <RightMenu />
            </div>
        </div>

    </div>
</template>
  
<style></style>