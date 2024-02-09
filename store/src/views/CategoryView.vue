<script setup>
import ProductsList from "../components/ProductsList.vue";
</script>

<template>
  <ProductsList :title="`Category: ${category}`" :products="filteredProducts" />
</template>

<script>
export default {
  data() {
    return {
      filteredProducts: [],
      category: ""
    }
  },
  mounted() {
    this.category = this.$route.params.category;
    this.filteredProducts = getProducts().filter((p) => p.category === this.category);
  }
}
</script>
