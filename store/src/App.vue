<template>
  <header>
    <nav>
      <router-link to="/">Login</router-link> |
      <router-link to="/products">Products</router-link> |
      <router-link to="/users">Users</router-link>
    </nav>
    <div class="user">
      <div v-if="user === null">
        <router-link to="/">
          <v-btn>Log in</v-btn>
        </router-link>
      </div>
      <div v-else>
        <span class="username">
          {{ user.username }}
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
import { users } from './logic/apiData.js';
import router from '@/router';

export default {
  data() {
    return {
      user: null
    }
  },
  methods: {
    handleLogout() {
      localStorage.setItem("userId", "");
      this.user = null;
      router.push("/");
    }
  },
  watch: {
    $route() {
      const userId = parseInt(localStorage.getItem("userId"));
      if (!isNaN(userId)) {
        this.user = users.find((u) => userId === u.id) || null;
      }
    }
  }
}
</script>
