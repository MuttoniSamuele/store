<template>
  <div style="margin-top: 4rem;">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field v-model="email" density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>

      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"></v-text-field>

      <div v-if="wrongLogin">
        <p style="color: red;">Failed to login</p>
      </div>

      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login">
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <router-link class="text-blue text-decoration-none" to="/signup">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { users } from '@/logic/apiData';
import router from '@/router';

export default {
  data: () => ({
    visible: false,
    email: "",
    password: "",
    wrongLogin: false,
  }),
  methods: {
    login() {
      const user = users.find((u) => u.email === this.email && u.password === this.password);
      if (user !== undefined) {
        localStorage.setItem("userId", user.id);
        router.push("/products");
      } else {
        this.wrongLogin = true;
      }
    }
  }
}
</script>
