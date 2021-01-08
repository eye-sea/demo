<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="https://home.miui.com/" target="_blank">MIUI</a><span>|</span>
      <a href="javascript:;">米家</a><span>|</span>
      <a href="javascript:;">米聊</a><span>|</span>
      <a href="javascript:;">多看</a>
    </div>
    <div class="copyright">
      © mi.com 京ICP证110507号 京ICP备10046444号 京公网安备11010802020134号 京网文[2020]0276-042号
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer',
}
</script>

<style lang="less" scoped>
.footer{
  height: 234px;
  border-top: 4px solid #FF6600;
  background-color: #333333;
  color: #999999;
  font-size: 16px;
  text-align: center;
  .footer-logo{
    margin: 46px 0 31px;
    img{
      width: 53px;
      height: 34px;
      // margin-bottom: 13px;
    }
  }
  .footer-link{
    margin-bottom: 13px;
    a{
      color: #999999;
      display: inline-block;
    }
    span{
      margin: 0 10px;
    }
  }
}
</style>