<script setup>
import { useAuthStore } from '../../stores/user-store';
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const user = useAuthStore();
let router = useRouter()

const logout = () => {
    user.logout()
    localStorage.removeItem('ACCESS_TOKEN')
    router.push('/login')
}

const roleName = ref({
    1: 'Администратор',
    2: 'Студент',
    3: 'Преподаватель',
    4: 'Методист',
    5: 'Директор',
})
</script>

<template>
    <div class="container">
        <div class="row ">
            <nav class="navbar navbar-expand-lg border">
                <div class="col-2">
                    <div class="container-fluid ">
                        <a class="navbar-brand " href="#">ИЗВО</a>
                    </div>
                </div>
                <div class="col-8 d-flex justify-content-center">
                    <a class="nav-link active" aria-current="page" href="#">{{ roleName[user.userInfo.role_id] }}</a>
                </div>
                <div class="col-2 d-flex justify-content-end">
                    <div class="dropdown ">
                        <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">{{ user.userInfo.fio }}</a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" @click="logout" href="#">Выйти</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<!-- <div class="row ">
        <nav class="navbar navbar-expand-lg border">
            <div class="col-2">
                <div class="container-fluid ">
                    <a class="navbar-brand " href="#">ИЗВО</a>
                </div>
            </div>
            <div class="col-8 d-flex justify-content-center">
                <a class="nav-link active" aria-current="page" href="#">Студент</a>
            </div>
            <div class="col-2 d-flex justify-content-end">
                <div class="dropdown ">
                    <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">ФИО</a>
                    <ul class="dropdown-menu ">
                        <li><a class="dropdown-item " href="#">Выйти</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div> -->




<style scoped></style>
../../stores/axios-client.js../../api.js../../stores/user.js../../stores/user-store.js