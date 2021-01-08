<template>
  <div class="ali-pay">
    <loading v-if="loading"></loading>
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
import Loading from '../components/Loading'
export default {
  name: 'alipay',
  data() {
    return {
      orderId: this.$route.query.orderId, //orderNo 订单号
      content: '', //保存html代码
      loading: true  //控制加载图片
    }
  },
  components: {
    Loading
  },
  mounted() {
    this.paySubmit();
  },
  methods: {
    paySubmit() {
      this.axios.post('pay',{
        orderId: this.orderId, //订单号 orderNo
        orderName: 'vue仿小米商城',    //扫码支付时订单名称
        amount: 0.01,     //单位元
        payType: 1 //1支付宝，2微信
      }).then((res) => {
        this.content = res.content;
        setTimeout(() => {
          document.forms[0].submit(); //获取表单并提交,res.content里有一个form表单
        },100)
      })
    }
  },
}
</script>

<style scoped>
</style>