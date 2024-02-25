<script setup>
import ProductsList from "../components/ProductsList.vue"
</script>

<template>
  <v-container>
    <ProductsList title="Cart" :products="productsList" productBtnText="Remove from cart"
      @productBtnClick="removeFromCart" />
    <div style="display: flex; justify-content: center; margin: 1.5rem 0;">
      <v-btn @click="buyAllProducts">Buy all</v-btn>
    </div>
  </v-container>
</template>

<script>
import { loadCart, saveCart } from "../logic/localStorage.js";
import { getProducts, buyProducts } from '../logic/api.js';

export default {
  data() {
    return {
      productsList: [],
    }
  },
  methods: {
    async buyAllProducts() {
      const res = await buyProducts(loadCart());
      console.log(res.ok)
      saveCart([]);
      this.productsList = [];
    },
    async removeFromCart(id) {
      const ids = new Set(loadCart());
      ids.delete(id);
      saveCart(Array.from(ids));
      this.productsList = this.productsList.filter((p) => ids.has(p.productCode));
    }
  },
  async mounted() {
    const products = await getProducts();
    const ids = loadCart();
    this.productsList = products.filter((p) => ids.includes(p.productCode));
  }
}
</script>
