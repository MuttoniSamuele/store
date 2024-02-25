<script setup>
import ProductsList from "../components/ProductsList.vue"
</script>

<template>
  <ProductsList title="Cart" :products="productsList" />
</template>

<script>
import { loadCart, saveCart } from "../logic/localStorage.js";
import { getProducts } from '../logic/api.js';

export default {
  data() {
    return {
      productsList: [],
    }
  },
  methods: {
    buyProducts() {
      // TODO: API request
      saveCart([]);
      this.productsList = [];
    }
  },
  async mounted() {
    const products = await getProducts();
    const ids = loadCart();
    this.productsList = products.filter((p) => ids.includes(p.id));
  }
}
</script>
