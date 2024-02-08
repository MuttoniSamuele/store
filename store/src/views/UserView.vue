<script setup>
import GoogleMaps from "../components/GoogleMaps.vue"
import UserInfoCard from "../components/UserInfoCard.vue"

const SIZE = 450;
const MARGIN = 20;
</script>

<template>
  <router-link to="/users" style="display: block; margin: 15px;">
    <v-btn>Back</v-btn>
  </router-link>

  <div v-if="user !== null" class="info-cards-wrapper">
    <UserInfoCard :width="SIZE" :margin="MARGIN" title="General" :data="[
      ['ID', user.id],
      ['Last name', user.lastName],
      ['First name', user.firstName],
      ['Maiden name', user.maidenName],
      ['Age', user.age],
      ['Gender', user.gender],
      ['Birth date', user.birthDate]
    ]" />

    <UserInfoCard :width="SIZE" :margin="MARGIN" title="Account" :data="[
      ['Email', user.email],
      ['Phone', user.phone],
      ['Username', user.username],
      ['Password', user.password]
    ]" />

    <UserInfoCard :width="SIZE" :margin="MARGIN" title="Features" :data="[
      ['Blood group', user.bloodGroup],
      ['Height', user.height],
      ['Weight', user.weight],
      ['Eye color', user.eyeColor],
      ['Hair', `${user.hair.color}, ${user.hair.type}`]
    ]" />

    <UserInfoCard :width="SIZE" :margin="MARGIN" title="Online data" :data="[
      ['Domain', user.domain],
      ['IP address', user.ip],
      ['MAC address', user.macAddress],
      ['User agent', user.userAgent]
    ]" />

    <UserInfoCard :width="SIZE" :margin="MARGIN" title="Bank" :data="[
      ['Card expiry', user.bank.cardExpire],
      ['Card number', user.bank.cardNumber],
      ['Card type', user.bank.cardType],
      ['Currency', user.bank.currency],
      ['IBAN', user.bank.iban],
    ]" />

    <UserInfoCard :width="SIZE" :margin="MARGIN" title="Identification" :data="[
      ['EIN', user.ein],
      ['SSN', user.ssn]
    ]" />

    <UserInfoCard :width="SIZE" :margin="MARGIN" title="Other" :data="[
      ['University', user.university]
    ]" />

    <GoogleMaps title="Home address" :width="SIZE" :height="SIZE" :margin="MARGIN" frameborder="1"
      :lat="user.address.coordinates.lat" :lng="user.address.coordinates.lng" />

    <GoogleMaps title="Company address" :width="SIZE" :height="SIZE" :margin="MARGIN" frameborder="1"
      :lat="user.company.address.coordinates.lat" :lng="user.company.address.coordinates.lng" />
  </div>
</template>

<style>
.info-cards-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<script>
import { users } from '../logic/apiData.js';

export default {
  data() {
    return {
      user: null,
    }
  },
  mounted() {
    const id = parseInt(this.$route.params.id);
    for (const user of users) {
      if (user.id === id) {
        this.user = user;
        break;
      }
    }
  }
}
</script>
