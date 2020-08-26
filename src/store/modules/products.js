import shop from "@/api/shop";

export default {
  namespaced: true,
  
  state: {
    items: [],
  },

  getters: {
    availableProducts(state, getters) {
      return state.items.filter(product => product.inventory > 0);
    },
  },

  mutations: {
    setProducts(state, products) {
      state.items = products;
    },

    decrementProductInventory(state, product) {
      product.inventory--;
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
    }
  }
};
