<script setup>
import ProductsList from "../components/ProductsList.vue";
</script>

<template>
  <v-container>
    <ProductsList title="Products" :products="productsList" productBtnText="Add to cart" @productBtnClick="addToCart" />
  </v-container>
</template>

<script>
import { getProducts } from '../logic/api.js';
import { loadCart, saveCart } from "../logic/localStorage.js";

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

export function addToCart(id) {
  const ids = new Set(loadCart());
  ids.add(id);
  saveCart(Array.from(ids));
}
</script>
