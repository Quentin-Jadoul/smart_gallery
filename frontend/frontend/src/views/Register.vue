<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-12 pb-12 mb-4" @submit.prevent="register">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input v-model="registerForm.username"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="text" placeholder="Username">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input v-model="registerForm.email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" placeholder="Email">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input v-model="registerForm.password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="******************">
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Register
                    </button>
                </div>
                <div class="mt-4">
                    <p class="text-center">Already have an account? <a href="/login"
                            class="text-blue-500 hover:text-blue-700">Sign in</a></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import http from '../http';
import { login } from '../http.js';

export default {
    name: 'Register',
    data() {
        return {
            registerForm: {
                username: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async register() {
            try {
                const registerResponse = await http.post('/create-user/', this.registerForm);

                if (registerResponse.status === 201) {
                    const loginResponse = await login({
                        username: this.registerForm.username,
                        password: this.registerForm.password
                    });

                    // If the login was successful, redirect the user to the home page
                    if (loginResponse.data.token) {
                        console.log("Login successful")
                        this.$router.push('/');
                    } else {
                        // Handle login errors
                    }
                } else {
                    // Handle registration errors
                }
            } catch (error) {
                // Handle network errors
            }
        }
    }
}
</script>