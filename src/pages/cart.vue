<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <!-- 购物车盒子 -->
        <div class="cart-box">
          <!-- 购物车头部 -->
          <ul class="cart-item-head">
            <li class="col-1"><span class="checkbox" :class="{'checked':allChecked}" @click="toggleAll"></span>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <!-- 购物车列表 -->
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item, index) in list" :key="index">
              <!-- 选择框 -->
              <div class="item-check">
                <!-- <span class="checkbox" :class="{'checked':item.productSelected}" @click="selete(item)"></span> -->
                <span class="checkbox" :class="{'checked':item.productSelected}" @click="updateCart(item)"></span>
              </div>
              <!-- 图片和商品名称 -->
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt="">
                <span>{{item.productName + ' ' + item.productSubtitle}}</span>
              </div>
              <!-- 商品单价 -->
              <div class="item-price">{{item.productPrice}}</div>
              <!-- 商品数量 -->
              <div class="item-num">
                <div class="num-box">
                  <!-- <a href="javascript:;" @click="delNum(item)">-</a> -->
                  <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                  <span>{{item.quantity}}</span>
                  <!-- <a href="javascript:;" @click="addNum(item)">+</a> -->
                  <a href="javascript:;" @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <!-- 小计 -->
              <div class="item-total">{{item.productTotalPrice}}</div>
              <!-- 操作 -->
              <div class="item-del" @click="delProduct(item.productId)"></div>
            </li>
          </ul>
        </div>
        <!-- 购物车盒子底部信息  清除浮动-->
        <div class="order-wrap clearfix">
          <!-- 左浮动 -->
          <div class="cart-tip fl">
            <a href="#/index">继续购物</a>
            共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
          </div>
          <!-- 总价格 右浮动-->
          <div class="total fr">
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
            <!-- <button class="btn">去结算</button> -->
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
import NavFooter from '../components/NavFooter'
import ServiceBar from '../components/ServiceBar'
import { Message } from 'element-ui'  //不用再引入，以在vue原型上挂载
export default {
  name: 'cart',
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar
  },
  data() {
    return {
      list: [],         //商品列表
      allChecked: false,//是否全选
      cartTotalPrice: 0,//商品总金额
      checkedNum: 0     //选中的商品数量
    }
  },
  mounted() {
    // 初始化页面，获取购物车信息
    this.getCartList();
  },
  methods: {
    // 获取购物车信息
    getCartList() {
      this.axios.get('/carts').then((res) => {
        // console.log(res);
        this.renderData(res);
      })
    },
    //控制全选功能
    toggleAll() {
      let url = this.allChecked?'/carts/unSelectAll':'/carts/selectAll';
      this.axios.put(url).then((res) => {
        this.renderData(res);
      })
    },
    // 公共赋值
    renderData(res) {
      this.list = res.cartProductVoList;
      this.cartTotalPrice = res.cartTotalPrice;
      this.allChecked = res.selectedAll;
      this.checkedNum = this.list.filter(item=>item.productSelected).length; //选中的商品数量
      // console.log(res);
    },
    /*//更新购物车数量
    // +
    addNum(item) {
      let quantity = item.quantity;
      if(quantity == item.productStock){
        return
      }
      ++quantity;
      this.axios.put(`/carts/${item.productId}`,{
        quantity,
        selected: true
      }).then((res) => {
        this.renderData(res);
        //list是数组，还没循环出来
        // console.log(item.quantity);
        // console.log(item.productStock);
      })
    },
    // -
    delNum(item) {
      let quantity = item.quantity;
      if(quantity == 1){
        return
      }
      --quantity;
      this.axios.put(`/carts/${item.productId}`,{
        quantity,
        selected: true
      }).then((res) => {
        this.renderData(res);
        //list是数组，还没循环出来
        // console.log(item.quantity);
      })
    },
    //单选
    selete(item) {
      let selected = !item.productSelected;
      let quantity = item.quantity;
      this.axios.put(`/carts/${item.productId}`,{
        quantity,
        selected: true
      }).then((res) => {
        alert('dna')
        this.renderData(res);
      })
    },*/

    //更新购物车数量和购物车单选状态
    updateCart(item,type){
        let quantity = item.quantity,
            selected = item.productSelected;
        if(type == '-'){
          if(quantity == 1){
            this.$message.warning('商品至少保留一件');
            return;
          }
          --quantity;
        }else if(type == '+'){
          if(quantity >= item.productStock){
            this.$message.warning('购买数量不能超过库存数量');
            return;
          }
          ++quantity;
        }else{
          selected = !item.productSelected;
        }
        this.axios.put(`/carts/${item.productId}`,{
          quantity,
          selected
        }).then((res)=>{
          this.renderData(res);
        })
      },

    //删除购物车
    delProduct(productId) {
      this.axios.delete(`/carts/${productId}`).then((res) => {
        Message.success('删除成功');
        this.renderData(res);
      })
    },
    //购物车下单
    order() {
      //如果list数组里的每一项商品都为 不选中，则返回true给isChenk
      let isCheck = this.list.every(item => !item.productSelected);
      if(isCheck) {
        this.$message.warning('请选择一件商品')
      } else {
        this.$router.push('/order/confirm')
      }
    }
  },
}
</script>

<style lang="less">
.cart{
  .wrapper{
    background-color: #F5F5F5;
    padding: 30px 0 114px;
    .cart-box{
      background-color:#fff;
      font-size:14px;
      color:#999999;
      text-align: center;
      .checkbox{
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #F5F5F5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked{
          background:url('/imgs/icon-gou.png') #FF6600 no-repeat center;
          background-size:16px 12px;
          border:none;
        }
      }
      // 购物车头部
      .cart-item-head{
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1{
          flex: 1;
        }
        .col-2{
          flex: 2;
        }
        .col-3{
          flex: 3;
        }
      }
      // 购物车列表 ul
      .cart-item-list{
        .cart-item{  //单个商品 li
          display: flex;
          align-items: center;  //垂直居中
          height: 125px;
          border-top:1px solid #E5E5E5;
          font-size:16px;
          .item-check{ //选择框
            flex: 1;
          }
          .item-name{
            flex: 3;
            display: flex;        //这两行可以解决各个商品的名称长度不一导致
            align-items: center;  //上下商品图片与名称不对齐问题
            font-size: 18px;
            color: #333333;
            img{
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span{
              margin-left: 30px;
            }
          }
          .item-price{
            flex: 1;
            color:#333333;
          }
          .item-num{
            flex: 2;
            .num-box{ //数量加减计算盒子
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border:1px solid #E5E5E5;
              font-size:14px;
              a, span{
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }
          .item-total{
            flex: 1;
            color:#FF6600;
          }
          .item-del{
            flex: 1;
            width: 14px;
            height: 12px;
            background: url('/imgs/icon-close.png') no-repeat center;
            background-size:contain;
            cursor:pointer;
          }
        }
      }
    }
    .order-wrap{
      font-size:14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip{
        margin-left: 29px;
        a{
          color: #666666;
          margin-right:37px;
        }
        span{
          color:#FF6600;
          margin:0 5px;
        }
      }
      .total{
        // font-size:14px;
        color:#FF6600;
        span{
          font-size:24px;
        }
        a{
          width:202px;
          height:50px;
          line-height:50px;
          font-size:18px;
          margin-left:37px;
        }
      }
    }
  }
}
</style>