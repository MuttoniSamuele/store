<template>
  <v-card flat title="Employees">
    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
        hide-details></v-text-field>
    </template>
    <v-data-table :items="employees" :search="search">
    </v-data-table>
  </v-card>
</template>

<script>
import { getEmployees } from '../logic/api.js';

export default {
  data() {
    return {
      search: '',
      employees: []
    }
  },
  async mounted() {
    this.employees = await getEmployees();
  }
}
</script>
