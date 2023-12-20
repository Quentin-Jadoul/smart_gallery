<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-12 pb-12 mb-4" @submit.prevent="login">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="text" placeholder="Username" v-model="loginForm.username">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="******************" v-model="loginForm.password">
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign In
                    </button>
                </div>
                <div class="mt-4">
                    <p class="text-center">Not registered? 
                        <a href="/register" class="text-blue-500 hover:text-blue-700">Click here</a>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import { login } from '../http.js';

export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async login() {
            try {
                const response = await login(this.loginForm);

                if (response.data.token) {
                    this.$router.push('/');
                } else {
                    // Handle login errors
                }
            } catch (error) {
                // Handle network errors
            }
        }
    }
}
</script>
  
<style scoped></style>