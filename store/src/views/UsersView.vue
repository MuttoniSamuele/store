<template>
  <v-card flat title="Users">
    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
        hide-details></v-text-field>
    </template>
    <v-data-table :items="users" :search="search">
    </v-data-table>
  </v-card>
</template>

<script>
import { getUsers } from '../logic/api.js';

export default {
  data() {
    return {
      search: '',
      users: []
    }
  },
  async mounted() {
    this.users = await getUsers();
  }
}
</script>
