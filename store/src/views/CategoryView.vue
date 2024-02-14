<script setup>
import ProductsList from "../components/ProductsList.vue";
</script>

<template>
  <ProductsList :title="`Category: ${category}`" :products="filteredProducts" />
</template>

<script>
import { getProducts } from '../logic/api.js';

export default {
  data() {
    return {
      filteredProducts: [],
      category: ""
    }
  },
  async mounted() {
    this.category = this.$route.params.category;
    this.filteredProducts = await getProducts(this.category);
  }
}
</script>
