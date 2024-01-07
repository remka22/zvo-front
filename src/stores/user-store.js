import { ref } from 'vue'
import { defineStore } from 'pinia'
// import axiosApiInstance from '../api'
import axiosClient from "../api.js";


export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    fio: '',
    role_id: '',
  })
  const error = ref('')
  const loader = ref(false)

  const auth = async (payload) => {
    error.value = '';
    loader.value = true;
    try {
      let response = await axiosClient.post(`/login`, {
        ...payload
      });
      userInfo.value = {
        token: response.data.token,
        email: response.data.user.email,
        fio: response.data.user.fio,
        role_id: response.data.user.role_id,
      }
      localStorage.setItem('ACCESS_TOKEN', response.data.token)
    } catch (err) {
      throw error.value;
    } finally {
      loader.value = false;
    }
  }

  const user = async () => {
    error.value = '';
    loader.value = true;
    try {
      let response = await axiosClient.get(`/user`);
      // console.log(response.data)
      userInfo.value.email = response.data.email
      userInfo.value.fio = response.data.fio
      userInfo.value.role_id = response.data.role_id
    } catch (err) {
      console.log(error.value);
    } finally {
      loader.value = false;
    }
  }

  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      role_id: '',
    }
  }

  return { auth, user, userInfo, error, loader, logout }
})
