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
import router from '@/router';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      productsList: [],
    }
  },
  methods: {
    async buyAllProducts() {
      if (!this.isLoggedIn) {
        router.push("/");
        return;
      }
      const cart = loadCart();
      if (cart.length === 0) {
        return;
      }
      const res = await buyProducts(cart, this.user.customerNumber);
      if (!res.ok) {
        return;
      }
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
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
  },
}
</script>
