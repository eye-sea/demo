<template>
  <div class="detail">
    <product-param :title="product.name"></product-param>
    <div class="wrapper">
      <div class="container clearfix">
        <div class="swiper">
          <!-- to-do 轮播图-->
        </div>
        <div class="content">
          <h2 class="item-title">{{product.name}}</h2>
          <p class="item-info">相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红<br/>外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</p>
          <div class="delivery">小米自营</div>
          <div class="item-price">{{product.price}}元<span class="del">1999元</span></div>
          <div class="line"></div>
          <div class="item-addr">
            <i class="icon-loc"></i>
            <div class="addr">北京 北京市 朝阳区 安定门街道</div>
            <div class="stock">有现货</div>
          </div>
          <div class="item-version clearfix">
            <h2>选择版本</h2>
            <div class="phone fl" :class="{'checked':version==1}" @click="version = 1">6GB+64GB 全网通</div>
            <div class="phone fr" :class="{'checked':version==2}" @click="version = 2">4GB+64GB 移动4G</div>
          </div>
          <div class="item-color clearfix">
            <h2>选择颜色</h2>
            <div class="phone fl" :class="{'checked':color==1}" @click="color=1">
                深空灰
            </div>
            <div class="phone fr" :class="{'checked':color==2}" @click="color=2">
                商务黑
            </div>
          </div>
          <div class="item-total">
            <div class="phone-info clearfix">
              <div class="fl">{{product.name}} {{version==1?'6GB+64GB 全网通':'4GB+64GB 移动4G'}} {{color==1?'深空灰':'商务黑'}}</div>
              <div class="fr">{{product.price}}</div>
            </div>
            <div class="phone-total">总计：{{product.price}}元</div>
          </div>
          <div class="btn-group">
            <a href="javascript:;" class="btn btn-huge fl" @click="addCart">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="decc">
          <img src="/imgs/detail/item-price.jpeg" alt="">
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import ProductParam from '../components/ProductParam'
import ServiceBar from '../components/ServiceBar'
export default {
  name: 'detail',
  components: {
    ServiceBar,
    ProductParam
  },
  data() {
    return {
      product: {},  //商品信息
      version: 1,  //控制商品版本切换
      color: 1,    //控制商品颜色切换
    }
  },
  mounted() {
    //初始化，获取商品信息
    this.getProductInfo();
  },
  methods: {
    getProductInfo() {
      let id = this.$route.params.id;
      this.axios.get(`/products/${id}`).then((res) => {
        this.product = res;
      })
    },
    addCart() {
      let id = this.$route.params.id;
      this.axios.post(`/carts`, {
        productId: id,
        selected: true,
      }).then((res) => {
        this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
        this.$router.push('/cart')
      })
    }
  },
}
</script>

<style lang="less">
@import '../assets/less/config.less';
@import '../assets/less/mixin.less';
.detail{
  .wrapper{
    .swiper{
      float: left;
      width:642px;
      height:617px;
      margin-top:5px;
      // background-color: pink;
    }
    .content{
      float: right;
      width:584px;
      height:870px;
      &>h2{ //.item-title
        font-size: 28px;
        padding: 30px 0 16px;
        height: 26px;
      }
      p{ //.item-info
        font-size:14px;
        height: 36px;
      }
      .delivery{
        font-size:16px;
        color:#FF6700;
        margin: 26px 0 14px;
        height: 15px;
      }
      .item-price{
        font-size:20px;
        color:#FF6700;
        height: 19px;
        .del{
          font-size:16px;
          color:#999999;
          margin-left:10px;
          text-decoration:line-through;
        }
      }
      .line{
        height: 0;
        margin: 25px 0 28px;
        border-top:1px solid #E5E5E5;
      }
      .item-addr{
        height: 108px;
        background-color:#FAFAFA;
        border:1px solid #E5E5E5;
        box-sizing:border-box;
        padding: 31px 0 0 64px;
        font-size:14px;
        line-height:14px;
        position:relative;
        .icon-loc{
          position: absolute;
          top: 27px;
          left: 34px;
          #bgImg(20px,20px,'/imgs/detail/icon-loc.png');
        }
        .addr{
          color:#666666;
        }
        .stock{
          margin-top:15px;
          color:#FF6700;
        }
      }
      .item-version,.item-color{
        margin-top:  30px;
        h2{
          font-size:18px;
          margin-bottom:20px;
        }
        .phone{
          width: 287px;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          color:#333333;
          border:1px solid #E5E5E5;
          box-sizing: border-box;
          text-align:center;
          cursor: pointer;
          span{
            display:inline-block;
            width:14px;
            height:14px;
            background-color:#666666;
            margin-left:15px;
            // vertical-align: middle;
          }
          &.checked{
            border:1px solid #FF6600;
            color:#FF6600;
          }
        }
      }
      .item-total{
        height: 108px;
        background: #FAFAFA;
        margin:50px 0 30px;
        padding: 24px 33px 29px 30px;
        font-size: 14px;
        box-sizing: border-box;
        .phone-total{
          font-size: 24px;
          color: #FF6600;
          margin-top: 18px;
        }
      }
    }
  }
  .price-info{
    background-color:#F3F3F3;
    height:340px;
    h2{
      font-size:24px;
      color:#333333;
      padding-top:38px;
      margin-bottom:30px;
    }
  }
}
</style>