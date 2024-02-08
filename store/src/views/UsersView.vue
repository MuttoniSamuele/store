<template>
  <v-card flat title="Users">
    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
        hide-details></v-text-field>
    </template>
    <v-data-table :headers="headers" :items="users" :search="search">
      <template v-slot:[`item.actions`]="{ item }">
        <router-link :to="{ name: 'user', params: { id: item.id } }">
          <v-icon size="small" class="me-2">
            mdi-open-in-new
          </v-icon>
        </router-link>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { users } from '../logic/apiData.js';

export default {
  data() {
    return {
      search: '',
      headers: [
        { key: 'id', title: 'ID' },
        { key: 'lastName', title: 'Last name' },
        { key: 'firstName', title: 'First name' },
        { key: 'age', title: 'Age' },
        { key: 'gender', title: 'Gender' },
        { key: 'username', title: 'Username' },
        { key: 'email', title: 'Email' },
        { key: 'phone', title: 'Phone' },
        { key: 'actions', title: 'Actions', sortable: false },
      ],
      users: users
    }
  },
}
</script>
