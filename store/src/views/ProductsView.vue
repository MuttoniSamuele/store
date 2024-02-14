<script setup>
import ProductsList from "../components/ProductsList.vue";
</script>

<template>
  <ProductsList title="Products" :products="productsList" />
</template>

<script>
import { getProducts } from '../logic/api.js';

export default {
  data() {
    return {
      productsList: []
    }
  },
  async mounted() {
    this.productsList = await getProducts();
  }
}
</script>
