<template>
  <div class="header">
      <div class="nav-topbar">
        <div class="container">
          <div class="topbar-menu">
            <a href="javascript:;">小米商城</a>
            <a href="javascript:;">MUI</a>
            <a href="javascript:;">云服务</a>
            <a href="javascript:;">协议规则</a>
          </div>
          <div class="topbar-user">
            <a href="javascript:;" v-if="username">{{username}}</a>
            <a href="javascript:;" v-if="!username" @click="login" class="deng">登录</a>
            <a href="javascript:;" v-if="username" @click="logout">退出</a>
            <a href="/#/order/list" v-if="username">我的订单</a>
            <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
          </div>
        </div>
      </div>
      <div class="nav-header">
        <div class="container">
          <div class="header-logo">
            <a href="/#/index"></a>
          </div>
          <div class="header-menu">
            <div class="item-menu">
              <span>小米手机</span>
              <div class="children">
                <ul>
                  <li class="product" v-for="(item, index) in phoneList" :key="index">
                    <a :href="'/#/product/' + item.id" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="item.mainImage" :alt="item.subtitle">
                      </div>
                      <div class="pro-name">{{item.name}}</div>
                      <div class="pro-price">{{item.price | currency}}</div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="item-menu">
              <span>Redmi红米</span>
            </div>
            <div class="item-menu">
              <span>电视</span>
              <div class="children">
                <ul>
                  <li class="product">
                    <a href="" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="">
                      </div>
                      <div class="pro-name">小米cc9</div>
                      <div class="pro-price">3379元起</div>
                    </a>
                  </li>
                  <li class="product">
                    <a href="" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                      </div>
                      <div class="pro-name">小米cc9</div>
                      <div class="pro-price">3379元起</div>
                    </a>
                  </li>
                  <li class="product">
                    <a href="" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="">
                      </div>
                      <div class="pro-name">小米cc9</div>
                      <div class="pro-price">3379元起</div>
                    </a>
                  </li>
                  <li class="product">
                    <a href="" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="">
                      </div>
                      <div class="pro-name">小米cc9</div>
                      <div class="pro-price">3379元起</div>
                    </a>
                  </li>
                  <li class="product">
                    <a href="" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="">
                      </div>
                      <div class="pro-name">小米cc9</div>
                      <div class="pro-price">3379元起</div>
                    </a>
                  </li>
                  <li class="product">
                    <a href="" target="_blank">
                      <div class="pro-img">
                        <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt="">
                      </div>
                      <div class="pro-name">小米cc9</div>
                      <div class="pro-price">3379元起</div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="header-search">
            <div class="wrapper">
              <input type="text" name="keyword">
              <a href="javascript:;"></a>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
//引入mapState,可以对this.$store.statej简写
import { mapState } from 'vuex';
export default {
  name: 'nav-header', //加载组件时引用的值
  data() {
    return {
      phoneList: [],
    }
  },
  computed: {
    /*username() {
      return this.$store.state.username;
    },
    cartCount() {
      return this.$store.state.cartCount;
    },*/
    
    ...mapState(['username','cartCount']) //使用mapState
  },
  mounted() {
    this.getProductList();
    let params = this.$route.params;
    if(params && params.from == 'login') { //如果params为true并且是从登录页面过来的，就调用此接口
      this.getCartCount();
    }
  },
  filters: {
    currency(val) {
      if(!val) return '0.00';
      return '￥' + val.toFixed(2) + '元'; 
      // toFixed() 四舍五入为指定小数位数的数字
    }
  },
  methods: {
    getProductList() {
      this.axios.get('products', {
        params: {
          categoryId: '100012',
          pageSize:6,     //6条数据
        }
      }).then(res => {
          this.phoneList = res.list;
      })
    },
    login() {
      this.$router.push('/login')
    },
    logout() {
      this.axios.post('/user/logout').then(() => {
        this.$message.success('退出成功');
        this.$cookie.set('userId','', {expires:'-1'});//userId立即过期
        this.$store.dispatch('saveUserName',''); //用户名为空
        this.$store.dispatch('saveCartCount','0'); //购物车数量为0
      })
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res) => {
        this.$store.dispatch('saveCartCount', res);
      })
    },
    goToCart() {
      this.$router.push('/cart')
    }
  }
}
</script>

<style lang="less">
@import '../assets/less/base.less';
@import '../assets/less/mixin.less';
@import '../assets/less/config.less';

.header {
  .nav-topbar{
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #B0B0B0;
    .container{
      #flex();
      // display: flex;
      // justify-content: space-between;//两侧对齐
      // align-items: center;           //垂直居中
      a{
        display: inline-block;
        color: #B0B0B0;
        margin-right: 17px;
      }
      .my-cart{
        width: 110px;
        background-color: #FF6600;
        text-align: center;
        color: #ffffff;
        .icon-cart{
          #bgImg(16px,12px,'/imgs/icon-cart-checked.png');
          margin-right: 4px;
          // display: inline-block;
          // width: 16px;
          // height: 12px;
          // background: url('/imgs/icon-cart-checked.png') no-repeat center;
          // background-size: contain; 
          // margin-right: 4px;
        }
      }
    }
  }
  .nav-header{
    .container{
      position: relative; //子绝父相
      height: 112px;
      #flex();
      //.header-logo已在base.less里定义
      .header-menu{
        display: inline-block;
        width: 643px;
        margin-left: 209px;
        .item-menu{
          display: inline-block;
          color: #333333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px; //把.header-menu撑开112px高
          margin-right: 20px;
          span{
            cursor: pointer;
          }
          &:hover{
            color:@colorA;
            .children{
              height: 220px;
              opacity: 1;
            }
          }
          .children{
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0;
            overflow: hidden;  //清除浮动
            border-top: 1px solid #E5E5E5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10; //层级高 覆盖下面的内容
            transition: all .5s;
            background-color: #ffffff;
            .product{
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              a{
                display: inline-block;
              }
              img{
                width: auto;
                height: 111px;
                margin-top: 26px;
              }
              .pro-img{
                height: 137px;
              }
              .pro-name{
                font-weight: blod;
                margin-top: 19px;
                margin-bottom: 8px;
                color:@colorB;
              }
              .pro-price{
                color:@colorA;
              }
              &:before{
                content: ' ';
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid @colorF;
                height: 100px;
                width: 1px;
              }
              &:last-child:before{
                display: none;
              }
            }
          }
        }
      }
      .header-search{
        width: 319px;
        .wrapper{
          height: 50px;
          border: 1px solid #E0E0E0;
          display: flex;
          align-items: center;
          input{
            box-sizing: border-box;
            border: none;
            border-right: 1px solid #E0E0E0;
            width: 264px;
            height: 50px;
            padding-left: 14px;
          }
          a{
            #bgImg(18px,18px,'/imgs/icon-search.png');
            // display: inline-block;
            // width: 18px;
            // height: 18px;
            // background: url('/imgs/icon-search.png') no-repeat center;
            // background-size: contain;
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>