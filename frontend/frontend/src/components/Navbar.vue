<template>
  <nav class="flex items-center justify-between p-6 bg-blue-500 text-white">
    <div class="text-2xl font-bold">
      Smart Gallery
    </div>
    <div class="space-x-4 text-lg">
      <router-link class="hover:underline" :class="{ 'font-bold': $route.path === '/' }" to="/">Home</router-link>
      <router-link class="hover:underline" :class="{ 'font-bold': $route.path === '/persons' }"
        to="/persons">Persons</router-link>
        <router-link class="hover:underline" :class="{ 'font-bold': $route.path === '/login' }" to="/login" @click.native="handleLogout">{{ loginText }}</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    loginText() {
      return localStorage.getItem('token') ? 'Logout' : 'Log In';
    },
    loginLink() {
      return localStorage.getItem('token') ? '/logout' : '/login';
    }
  },
  methods: {
        handleLogout(event) {
            if (this.loginText === 'Logout') {
                event.preventDefault();
                localStorage.removeItem('token');
                location.reload();
            }
        }
    }
}
</script>
  
<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
}
</style>