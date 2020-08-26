import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

import shop from "@/api/shop";

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    checkoutStatus: null
  },
  getters: {
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    },
    
    cartProducts(state, getters) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id);
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      });
    },

    cartTotal(state, getters) {
      return getters.cartProducts.reduce((total, product) => {
        return total + (product.price * product.quantity);
      }, 0);
    },

    productIsInStock(state, getters) {
      return (product) => {
        return product.inventory > 0;
      };
    }
  },
  actions: {
    fetchProducts(context) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          context.commit('setProducts', products);
          resolve();
        });
      });
    },

    addProductToCart({state, getters, commit}, product) {
      if(getters.productIsInStock(product)) {
        const cartItem = state.cart.find(item => item.id === product.id);
        if(!cartItem) {
          commit('pushProductToCart', product.id);
        } else {
          commit('incrementItemQuantity', cartItem);
        }
        commit('decrementProductInventory', product);
      }
    },

    checkoutCart({state, commit}) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart');
          commit('setCheckoutStatus', 'success');
        },
        () => {
          commit('setCheckoutStatus', 'fail');
        }
      )
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },

    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      });
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },

    decrementProductInventory(state, product) {
      product.inventory--;
    },

    emptyCart(state) {
      state.cart = [];
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    }
  }
});