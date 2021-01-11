<template>
  <div class="product">
    <!-- 头部组件ProductParam -->
    <product-param :title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-param>
    <!-- 内容 -->
    <div class="content">
      <div class="item-bg">
        <h2>{{product.name}}</h2>
        <h3>{{product.subtitle}}</h3>
        <p>
          <a href="" id="">全球首款双频 GP</a><span>|</span>
          <a href="" id="">骁龙845</a><span>|</span>
          <a href="" id="">AI 变焦双摄</a><span>|</span>
          <a href="" id="">红外人脸识别</a>
        </p>
        <div class="price">
          <span>￥<em>{{product.price}}</em></span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <!-- <div class="item-swiper">
        <swiper :options="swiperOption">
          <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
          Optional controls
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div> -->
      <div class="item-video">
        <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <!-- 视频的背景图片 -->
        <div class="video-bg" @click="showSlide='slideDown'"></div>
        <!-- <div class="video-bg" @click="showSlide=true"></div>   1过渡-->
        <div class="video-box" v-show="showSlide">          
        <!-- <div class="video-box">                                2过渡 -->
          <!-- 视频遮罩层 -->
          <div class="overlay"></div>
          <!-- <div class="overlay" v-if="showSlide"></div>        3过渡 -->
          <!-- .video不能用v-if，v-if会一下子变化，没有过渡效果, -->
          <!-- (刚开始用了v-if="showSlide" :class="'slide'"，是错的，没有过渡效果) -->
          <div class="video" :class="showSlide">
          <!-- <div class="video" :class="{'slide':showSlide}">    4过渡 -->
            <!-- 关闭按钮 -->
            <span class="icon-close" @click="closeVideo"></span>
            <!-- <span class="icon-close" @click="showSlide=false"></span>   5过渡-->
            <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ProductParam from '../components/ProductParam';
export default {
  name: 'product',
  components: {
    // swiper,
    // swiperSlide,
    ProductParam
  },
  data() {
    return {
      // showSlide: false, //6 过渡效果
      showSlide: '', //控制动画效果
      product: {}, //保存商品信息
      // swiperOption:{
      //   autoplay:true,
      //   slidesPerView:3, //设置slider容器能够同时显示的slides数量
      //   spaceBetween: 30, //在slide之间设置距离（单位px）
      //   freeMode: true, //slide会根据惯性滑动可能不止一格且不会贴合
      //   pagination: {
      //     el: '.swiper-pagination',
      //     clickable :true,
      //   }
      // }
    }
  },
  mounted() {
    this.getProductInfo();//初始化，调用获取商品信息的接口
  },
  methods: {
    //获取商品信息
    getProductInfo() {
      let id = this.$route.params.id;
      this.axios.get(`/products/${id}`)
      .then((res) => {
        this.product = res;//由于main.js文件里进行了拦截处理，所以res就是返回来的data
        // console.log(res); //查看res的信息
      })
    },
    // 关闭video
    closeVideo() {
      this.showSlide = 'slideUp';
      setTimeout(() => {
        this.showSlide = '';
      }, 600)
    },
    // 立即购买
    buy() {
      let id = this.$route.params.id;
      this.$router.push(`/detail/${id}`);
      // this.$router.push('/detail/'+id);
    }
  }
}
</script>

<style lang="less">
@import '../assets/less/mixin.less';
.product{
  .content{
    .item-bg{
      background:url('/imgs/product/product-bg-1.png') no-repeat center;
      height: 718px;
      text-align: center;
      h2{
        font-size:80px;
        padding-top:55px;
      }
      h3{
        font-size: 24px;
        letter-spacing: 10px;
      }
      p{
        margin: 21px 0 40px;
        a{
          font-size: 16px;
          color: #333333;
        }
        span{
          margin: 0 15px;
        }
      }
      .price{
        font-size:30px;
        color:#333333;
        em{
          font-style:normal;
          font-size:38px;
        }
      }
    }
    .item-bg-2{
      background:url(/imgs/product/product-bg-2.png) no-repeat center;
      height:480px;
      background-size:1226px 397px;
    }
    .item-bg-3{
      background:url(/imgs/product/product-bg-3.png) no-repeat center;
      height:638px;
      background-size:cover;
    }
    .item-swiper{
        margin:36px auto 52px;
        .desc{
          font-size:18px;
          color:#333333;
          text-align:center;
        }
        img{
          width:100%;
          height: 100%;
        }
      }
    .item-video{
      height: 1044px;
      background-color: #070708;
      margin-bottom:76px;
      color:#FFFFFF;
      text-align:center;
      h2{
        font-size:60px;
        padding-top:82px;
        margin-bottom:47px;
      }
      p{
        font-size:24px;
        margin-bottom:58px;
      }
      .video-bg{
        width:1226px;
        height:540px;
        background:url('/imgs/product/gallery-1.png') no-repeat center;
        background-size:cover;
        margin:0 auto 120px;
        cursor:pointer;
      }
      .video-box{
        .overlay{
          #position(fixed);
          background-color:#333333;
          opacity:.4;
          // z-index: 10;
        }
        @keyframes slideDown{
          from {
            top: -50%;
            opacity: 0;
          }
          to {
            top: 50%;
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            top: 50%;
            opacity: 1;
          }
          to {
            top: -50%;
            opacity: 0;
          }
        }
        .video{
          position:fixed;
          top:-50%;
          left:50%;
          transform: translate(-50%,-50%);
          width:1000px;
          height:536px;
          // opacity: 1;
          /*opacity: 0;
          //7 过渡 主意把opacity改为1，过渡这里没有bug，动画有bug(f12时视频会漏下来，原因是视频用的是translate位移居中,要用定时器给个时间解决bug,(动画效果做完在v-show隐藏))
          transition: all 0.6s;
          &.slide{
            top:50%;
            opacity: 1;
          }*/
          &.slideDown{
            animation: slideDown .6s linear;
            top: 50%;
          }
          &.slideUp{
            animation: slideUp .6s linear;
          }
          video{
            width: 100%;
            height: 100%;
            // 类似于background-size
            object-fit: cover;
            outline: none;
          }
          .icon-close{
            position: absolute;
            top: 20px;
            right: 20px;
            #bgImg(20px,20px,'/imgs/icon-close.png');
            cursor: pointer;
            z-index: 11;
          }
        }
      }
    }
  }
  button{
    margin-left: 10px;
  }
}
</style>