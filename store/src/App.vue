<template>
  <header>
    <nav>
      <router-link to="/">Login</router-link> |
      <router-link to="/products">Products</router-link> |
      <router-link to="/users">Users</router-link> |
      <router-link to="/employees">Employees</router-link>
    </nav>
    <div class="user">
      <div v-if="!isLoggedIn">
        <router-link to="/">
          <v-btn>Log in</v-btn>
        </router-link>
      </div>
      <div v-else>
        <span class="username">
          {{ user.customerName }}
        </span>
        <v-btn @click="handleLogout">Log out</v-btn>
      </div>
    </div>
  </header>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  display: flex;
  justify-content: center;
  padding: 30px;
}

header nav {
  margin-left: auto;
}

header .user {
  margin-left: auto;
}

header .user .username {
  font-weight: bold;
  margin-right: 1rem;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
// import router from '@/router';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      lastName: null
    }
  },
  methods: {
    handleLogout() { }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
  },
}
</script>
