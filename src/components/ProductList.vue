<template>
  <div>
    <h1>Product List</h1>
    <img v-if="isLoading" src="https://i.imgur.com/JfPpwOA.gif" />
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} {{ product.inventory }}
        <button 
          @click="addProductToCart(product)"
          :disabled="!productIsInStock(product)"
        >
        Add to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      isLoading: false
    }
  },
  
  computed: {
    ...mapState({
      products: state => state.products
    }),

    ...mapGetters({
      productIsInStock: 'productIsInStock'
    })
  },
  created() {
    this.isLoading = true;
    this.fetchProducts()
      .then(() => this.isLoading = false);
  },
  
  methods: {
    ...mapActions({
      fetchProducts: 'fetchProducts',
      addProductToCart: 'addProductToCart'
    })
  }
}
</script>


