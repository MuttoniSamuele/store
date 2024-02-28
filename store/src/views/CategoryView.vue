<script setup>
import ProductsList from "../components/ProductsList.vue";
</script>

<template>
  <v-container>
    <ProductsList :title="`Category: ${category}`" :products="filteredProducts" productBtnText="Add to cart"
      @productBtnClick="addToCart" />
  </v-container>
</template>

<script>
import { getProducts } from '../logic/api.js';
import { addToCart } from "./ProductsView.vue";

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
