<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {

  },
  data() {
    return {

    }
  },
  mounted() {
    // 可以解决登陆有刷新网页不显示用户名和购物车数量的问题
    if(this.$cookie.get('userId')) { //只有登录时才调用以下两个接口
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    getUser() {
      this.axios.get('/user').then((res) => {
        this.$store.dispatch('saveUserName', res.username)
      })
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res) => {
        this.$store.dispatch('saveCartCount', res);
      })
    }
  }
}
</script>

<style lang="less">
@import './assets/less/reset.less';
@import './assets/less/config.less';
@import './assets/less/button.less';
@import './assets/less/base.less';
/* @import './assets/less/button.less'; */
</style>
