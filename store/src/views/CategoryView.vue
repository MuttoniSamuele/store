<script setup>
import ProductsList from "../components/ProductsList.vue";
</script>

<template>
  <ProductsList :title="`Category: ${category}`" :products="filteredProducts" />
</template>

<script>
import { products } from '../logic/apiData.js';

export default {
  data() {
    return {
      filteredProducts: [],
      category: ""
    }
  },
  mounted() {
    this.category = this.$route.params.category;
    this.filteredProducts = products.filter((p) => p.category === this.category);
  }
}
</script>
