<template>
  <div class="index">
    <div class="container">
      <!-- 轮播图与菜单模块 -->
      <div class="swiper-box">
        <!-- 菜单 -->
        <div class="nav-menu">
          <!-- 左边ul li菜单栏 -->
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item, i) in menuList" :key="i">
                  <li v-for="(sub, j) in item" :key="j">
                    <a :href="sub?'/#/product/'+sub.id:''">
                      <img v-lazy="sub?sub.img:'/imgs/item-box-1.png'" alt="">
                      {{sub?sub.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <!-- 轮播图 -->
        <swiper :options="swiperOption">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in slideList" :key="index">
            <a :href="`/#/product/${item.id}`"><img :src="item.img" alt=""></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
          <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
        </swiper>
      </div>
      <!-- 广告模块 -->
      <div class="ads-box">
        <a :href="'/#/product/'+item.id" v-for="(item, index) in adsList" :key="index">
          <img v-lazy="item.img" alt="">
        </a>
      </div>
      <!-- 广告 -->
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>
    </div>
    <!-- 产品模块 在container外部-->
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <!-- 左 -->
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35">
              <img v-lazy="'/imgs/mix-alpha.jpg'" alt="">
            </a>
          </div>
          <!-- 右 -->
          <div class="list-box">
            <div class="list" v-for="(arr, i) in phoneList" :key="i">
              <div class="item" v-for="(item, j) in arr" :key="j">
                <span :class="{'new-pro': j % 2 == 0}">新品</span>
                <div class="item-img">
                  <img v-lazy="item.mainImage" alt="">
                </div>
                <div class="item-info">
                  <h3>{{item.name}}</h3>
                  <p>{{item.subtitle}}</p>
                  <p class="price" @click="addCart(item.id)">{{item.price}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 服务组件 -->
    <service-bar></service-bar>
    <!-- modal组件 对话框-->
    <!-- v-on:submit 绑定modal组件传过来的 submit事件 -->
    <modal 
    title="提示" 
    sureText="查看购物车" 
    btnType="1" 
    modalType="middle" 
    v-bind:showModal="showModal"
    v-on:submit="goToCart"
    v-on:cancel="showModal = false">
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>  
    </modal>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import ServiceBar from '../components/ServiceBar'
import Modal from '../components/Modal'
export default {
  name: 'index',
  components: {
    ServiceBar,
    Modal,
    swiper,
    swiperSlide,
  },
  data() {
    return {
      //轮播图
      swiperOption:{
        loop : true,
        effect : 'fade',
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        autoplay: {
          delay: 2000,//2秒切换一次
          disableOnInteraction: false,//触碰swiper之后不禁止autoplay
        }, 
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      slideList:[
        {
          id:'42',
          img:'/imgs/slider/slide-1.jpg'
        },
        {
          id:'45',
          img:'/imgs/slider/slide-2.jpg'
        },
        {
          id:'46',
          img:'/imgs/slider/slide-3.jpg'
        },
        {
          id:'',
          img:'/imgs/slider/slide-4.jpg'
        }
      ],
      // 菜单
      menuList:[
          [
            {
              id:30,
              img:'/imgs/item-box-1.png',
              name:'小米CC9',
            },{
              id:31,
              img:'/imgs/item-box-2.png',
              name:'小米8青春版',
            },{
              id:32,
              img:'/imgs/item-box-3.jpg',
              name:'Redmi K20 Pro',
            },{
              id:33,
              img:'/imgs/item-box-4.jpg',
              name:'移动4G专区',
            }
          ],
          [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
        ],
        // 广告
        adsList:[
          {
            id:33,
            img:'/imgs/ads/ads-1.png'
          },{
            id:48,
            img:'/imgs/ads/ads-2.jpg'
          },{
            id:45,
            img:'/imgs/ads/ads-3.png'
          },{
            id:47,
            img:'/imgs/ads/ads-4.jpg'
          }
        ],
        phoneList:[],
        showModal:false
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.axios.get('/products', {
        //get请求要用 params 传参
        params: {
          categoryId: 100012,
          pageSize:14
        }
      }).then(res => {
        res.list = res.list.slice(6,14);
        this.phoneList = [res.list.slice(0,4), res.list.slice(4,8)];
      })
    },
    addCart(id) {
      this.axios.post('/carts', {
        productId: id,
        selected: true
      }).then((res) => {
        this.showModal = true;
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
        // console.log(res);
      })
    },
    goToCart() {
      this.$router.push('/cart')
    }
  }
}
</script>

<style lang="less">
  @import '../assets/less/config.less';
  @import '../assets/less/mixin.less';
.index{
  // .container{
  //   position: relative;
  // }
  .swiper-box{
    // 菜单
    .nav-menu{
      position: absolute;
      // top: 0;
      // left: 0;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      background-color:#55585a79;
      box-sizing:border-box;
      .menu-wrap{
        .menu-item{
          height: 50px;
          line-height: 50px;
          a{
            position: relative;
            display: block;
            font-size:16px;
            color: #ffffff;
            padding-left: 30px;
            &:after{
              content: ' ';
              position: absolute;
              top: 50%;
              right: 30px;
              transform: translate(0, -50%);
              #bgImg(10px, 15px, '/imgs/icon-arrow.png')
            }
          }
          &:hover{
            background-color: @colorA;
            .children{
              display: block;
            }
          }
          .children{
            display: none;
            position: absolute;
            top: 0;
            left: 264px;
            width: 962px;
            height: 451px;
            background-color:@colorG;
            border:1px solid @colorH;
            ul{
              display: flex;
              justify-content: space-between;
              height: 75px;
              li{
                flex: 1;
                height: 75px;
                line-height: 75px;
                padding-left: 23px;
              }
              a{
                color:@colorB;
                font-size: 14px;
              }
              img{
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }

    }
    .swiper-container {
      height: 451px;
      .swiper-button-prev{
        left:274px;
      }
      img{
        width:100%;
        height:100%;
      }
    } 
  }
  .ads-box{
    #flex();
    margin: 14px 0 31px;
    a{
      // flex: 1; 图片中间没有空隙
      width: 296px;
      height: 167px;
    }
  }
  .banner{
    margin-bottom: 50px;
  }
  .product-box{
    background-color: @colorJ;
    padding: 30px 0 50px;
    h2{
      font-size: @fontF;
      height: 21px;
      line-height: 21px;
      color: @colorB;
      margin-bottom: 20px;
    }
    .wrapper{
      display: flex;
      .banner-left{
        margin-right: 16px;
        img{
          width: 224px;
          height: 619px;
        }
      }
      .list-box{
        .list{
          #flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child{
            margin-bottom: 0;
          }
          .item{
            width: 236px;
            height: 302px;
            background-color: @colorG;
            text-align: center;
            span{
              display: inline-block;
              width: 67px;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              // color: @colorG;
              &.new-pro{
                background-color: #7ECF68;
              }
              &.kill-pro{
                background-color:#E82626;
              }
            }
            .item-img{
              img{
                width: 100%;
                height: 195px;
              }
            }
            .item-info{
              h3{
                font-size: @fontJ;
                color: @colorB;
                line-height: @fontJ;
                font-weight: bold;
              }
              p{
                color: @colorD;
                line-height: 13px;
                margin: 6px auto 13px;
              }
              .price{
                color: #F20A0A;
                font-size: @fontJ;
                font-weight: bold;
                cursor: pointer;
                &:after{
                  content: ' ';
                  #bgImg(22px,22px,'/imgs/icon-cart-hover.png');
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>