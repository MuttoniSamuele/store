<template>
  <div style="margin-top: 4rem;">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">

      <div class="text-subtitle-1 text-medium-emphasis">Name</div>
      <v-text-field v-model="customerName" density="compact" placeholder="Name" variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Contact last name</div>
      <v-text-field v-model="contactLastName" density="compact" placeholder="Contact last name"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Contact first name</div>
      <v-text-field v-model="contactFirstName" density="compact" placeholder="Contact first name"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Phone</div>
      <v-text-field v-model="phone" density="compact" placeholder="Phone" variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Address line 1</div>
      <v-text-field v-model="addressLine1" density="compact" placeholder="Address line 1"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Address line 2</div>
      <v-text-field v-model="addressLine2" density="compact" placeholder="Address line 2"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">City</div>
      <v-text-field v-model="city" density="compact" placeholder="City" variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">State</div>
      <v-text-field v-model="state" density="compact" placeholder="State" variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Postal code</div>
      <v-text-field v-model="postalCode" density="compact" placeholder="Postal code" variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Country</div>
      <v-text-field v-model="country" density="compact" placeholder="Country" variant="outlined"></v-text-field>

      <v-select @update:model-value="(e) => this.selectedEmployee = e" label="Employee" :items="employeeNames"></v-select>

      <div class="text-subtitle-1 text-medium-emphasis">Credit limit</div>
      <v-text-field v-model="creditLimit" density="compact" placeholder="Credit limit" variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Email</div>
      <v-text-field v-model="email" density="compact" placeholder="Email" variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>
      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" density="compact" placeholder="Password" variant="outlined"
        @click:append-inner="visible = !visible"></v-text-field>

      <div v-if="error !== null" style="color: red;">
        {{ error }}
      </div>

      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="register">
        Sign up
      </v-btn>

      <v-card-text class="text-center">
        <router-link class="text-blue text-decoration-none" to="/">
          Log in instead <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { register, getEmployees } from '../logic/api.js';
import router from '@/router';

export default {
  data: () => ({
    visible: false,
    customerName: "",
    contactLastName: "",
    contactFirstName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    creditLimit: 0,
    email: "",
    password: "",
    error: null,
    employeeNames: [],
    employeeIds: [],
    selectedEmployee: null,
  }),
  methods: {
    async register(e) {
      e.preventDefault();
      if (this.email === "") {
        this.error = "Missing \"email\"";
        return;
      }
      if (this.password === "") {
        this.error = "Missing \"password\"";
        return;
      }
      const index = this.employeeNames.indexOf(this.selectedEmployee);
      console.log(index, this.selectedEmployee);
      if (index < 0) {
        this.error = "Missing \"employee\"";
        return;
      }
      const salesRepEmployeeNumber = this.employeeIds[index];
      const res = await register(
        this.customerName, this.contactLastName, this.contactFirstName,
        this.phone, this.addressLine1, this.addressLine2, this.city, this.state,
        this.postalCode, this.country, salesRepEmployeeNumber,
        this.creditLimit, this.email, this.password
      );
      if (res.ok) {
        router.push("/");
      } else {
        this.error = (await res.json())?.error;
      }
    }
  },
  async mounted() {
    const employees = await getEmployees();
    this.employeeNames = employees.map((e) => e.lastName + e.firstName);
    this.employeeIds = employees.map((e) => e.employeeNumber);
  }
}
</script>
