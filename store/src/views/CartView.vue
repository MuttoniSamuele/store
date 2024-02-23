<script setup>
import ProductsList from "../components/ProductsList.vue"
</script>

<template>
  <ProductsList title="Cart" :products="products" />
</template>

<script>
// import { loadProducts, loadCart, saveCart, saveProducts } from "../logic/localStorage.js";

export default {
  data() {
    return {
      products: [],
    }
  },
  methods: {
    // getProductsInCart() {
    //   const products = loadProducts() || [];
    //   const ids = loadCart();
    //   this.products = products.filter((p) => ids.includes(p.id));
    // },
    // buyProducts(selected) {
    //   const products = loadProducts() || [];
    //   const boughtIds = products.filter((p) => selected.includes(p.id) && p.stock > 0).map((p) => p.id);
    //   const ids = loadCart();
    //   products.forEach((p) => boughtIds.includes(p.id) && p.stock--);
    //   saveProducts(products);
    //   saveCart(ids.filter((id) => !boughtIds.includes(id)));
    //   this.getProductsInCart();
    // }
  },
  mounted() {
    // this.getProductsInCart();
  }
}
</script>
