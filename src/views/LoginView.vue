<script setup>
import axiosClient from "../api.js";
import { useAuthStore } from '../stores/user-store';
import { ref, onMounted, onBeforeUpdate } from 'vue';
import { useRouter } from 'vue-router'

let email = ref('');
let password = ref('');

const user = useAuthStore();
let router = useRouter()

const auth = async () => {
    await user.auth({ email: email.value, password: password.value })
    checkAuth()
}


onMounted(() => {
    checkAuth()
})

const checkAuth = async () => {
    if (user.userInfo.role_id) {
        switch (user.userInfo.role_id) {
            case 5:
                router.push('/director');
                break
            case 4:
                router.push('/metodist');
                break
            case 3:
                router.push('/teacher');
                break
            case 2:
                router.push('/student');
                break
            case 1:
                router.push('/admin');
                break
        }
    }
}

</script>

<template>
    <div class="d-flex justify-content-center">
        <div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model="email" type="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div v-if="user.loader" class="d-flex justify-content-center">
                <div class="spinner-border text-info" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>.
            </div>
            <div v-else>
                <button v-on:click="auth" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
</template>

<style></style>