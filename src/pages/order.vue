<template>
  <div>
      <router-view></router-view>
      <service-bar></service-bar>
      <nav-footer></nav-footer>
  </div>
</template>

<script>
import ServiceBar from '../components/ServiceBar'
import NavFooter from '../components/NavFooter'
export default {
  name: 'order', //加载组件时引用的值
  components: {
    ServiceBar,
    NavFooter
  },
}
</script>

<style scoped>
</style>