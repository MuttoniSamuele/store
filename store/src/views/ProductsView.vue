<script setup>
import ProductsList from "../components/ProductsList.vue";
</script>

<template>
  <ProductsList title="Products" :products="productsList" />
</template>

<script>
import { products } from '../logic/apiData.js';

export default {
  data() {
    return {
      productsList: products
    }
  }
}
</script>
