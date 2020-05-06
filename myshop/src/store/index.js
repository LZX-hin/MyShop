import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ifToken: false,
    showBar: true,
    cartGoods: []
  },
  mutations: {
    toggleIfToken(state,token){
      if(token === false){
        state.ifToken = false;
      }else{
        state.ifToken = true;
      }
    },
    showBar(state){
      state.showBar = true;
    },
    hideBar(state){
      state.showBar = false;
    },
    // 添加到购物车
    addToCart(state,goodsObj){
      goodsObj.cashier = parseInt(goodsObj.price) * parseInt(goodsObj.cartCount)
      state.cartGoods.push(goodsObj);
    }
  },
  actions: {
  },
  modules: {
  }
})
