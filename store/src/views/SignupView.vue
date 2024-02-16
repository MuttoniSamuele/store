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

      <div class="text-subtitle-1 text-medium-emphasis">Employee</div>
      <v-text-field v-model="salesRepEmployeeNumber" density="compact" placeholder="Employee"
        variant="outlined"></v-text-field>

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
import { register } from '../logic/api.js';

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
    salesRepEmployeeNumber: 0,
    creditLimit: 0,
    email: "",
    password: "",
  }),
  methods: {
    async register(e) {
      e.preventDefault();
      await register(
        this.customerName, this.contactLastName, this.contactFirstName,
        this.phone, this.addressLine1, this.addressLine2, this.city, this.state,
        this.postalCode, this.country, this.salesRepEmployeeNumber,
        this.creditLimit, this.email, this.password
      );
      // router.push("/secretroute");
    }

  }
}
</script>
