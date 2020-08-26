import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

import cart from './modules/cart';
import products from './modules/products';

export default new Vuex.Store({
  modules: {
    cart,
    products
  },

  state: {
    
  },
  getters: {
    
  },
  actions: {

  },
  mutations: {
    
  }
});