import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations' 
import actions from './actions' 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '', //登录用户名
    cartCount: 0,  //购物车商品数量
  },
  mutations: {
    saveUserName(state, username) {
      //3 直接改变state里的username
      state.username = username;
    },
    saveCartCount(state, count) {
      //3 直接改变state里的username
      state.cartCount = count;
    },
  },
  actions: {
    saveUserName(content, username){
      //2 saveUserName方法 username参数  下一步mutations
      content.commit('saveUserName', username);
    },
    saveCartCount(content, count){
      //2 saveUserName方法 username参数  下一步mutations
      content.commit('saveCartCount', count);
    },
  },
  modules: {
  }
})
