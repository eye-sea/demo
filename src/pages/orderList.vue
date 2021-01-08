<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(item,index) in list" :key="index">
            <div class="order-title clearfix">
              <div class="item-info fl">
                {{item.createTime}}
                <span>|</span>
                {{item.receiverName}}
                <span>|</span>
                订单号：{{item.orderNo}}
                <span>|</span>
                {{item.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{item.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(order,i) in item.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="order.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{order.productName}}</div>
                    <div class="p-money">{{order.currentUnitPrice + '*' + order.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="item.state == 20">
                <a href="javascript:;">{{item.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(item.orderNo)">{{item.statusDesc}}</a>
              </div>
            </div>
          </div>
          <!--1. element-ui 分页器 -->
          <el-pagination
            v-if="true"
            class="pagination"
            background
            layout="prev, pager, next"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange">
          </el-pagination>
          <!--2. element-ui Button 加载更多 -->
          <!-- <div class="load-more" v-show="showNextPage"> -->
          <div class="load-more" v-show="false">
            <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
          </div>
          <!--3. vue-infinite-scroll插件 滑动加载 -->
          <div class="scroll-more" v-if="false"
            v-infinite-scroll="scrollMore" 
            infinite-scroll-disabled="busy" 
            infinite-scroll-distance="5">
              <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
          </div>
          <no-data v-if="!loading && list.length == 0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Pagination,Button} from 'element-ui' //按需引入element-ui组件
import infiniteScroll from 'vue-infinite-scroll'  //引入滑动加载的插件
import OrderHeader from '../components/OrderHeader'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
export default {
  name: 'order-list',
  directives: {infiniteScroll},
  components: {
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]:Pagination,    //注册element-ui的分页组件
    [Button.name]:Button    //注册element-ui的按钮组件
  },
  data() {
    return {
      loading: false,//等待加载组件
      list: [], //订单列表
      pageNum: 1,
      pageSize:10,
      total: 0, //订单列表总数量  分页器
      showNextPage:true,//加载更多：是否显示按钮
      busy:false, //滚动加载，是否触发  滚动加载
    }
  },
  mounted() {
    //初始化订单列表
    this.getOrderList();
  },
  methods: {
    //获取订单列表信息
    getOrderList() {
      this.loading = true;
      this.busy = true; //禁用scrollMore
      this.axios.get('/orders',{
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      }).then((res) => {
        this.loading = false;
        this.busy = false;  //开放scrollMore
        this.list = this.list.concat(res.list);
        this.total = res.total;
        this.showNextPage = res.hasNextPage; //控制最后一页不显示加载更多按钮
      }).catch(() => {
        this.loading = false;
      })
    },
    //去支付
    goPay(orderNo) {
      // 三种路由跳转方式
      // this.$router.push(`/order/pay?orderNo=${orderNo}`)
      // this.$router.push({
      //   name: 'order-pay',
      //   params: {
      //     orderNo
      //   }
      // })
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo
        }
      })
    },
    //第一种方法：分页器   分页 改变分页时触发
    handleChange(pageNum) {
      this.pageNum = pageNum;
      console.log(this.pageNum);
      this.getOrderList();
    },
    //第二种方法： 加载更多按钮  this.list = this.list.concat(res.list);
    loadMore() {
      this.pageNum++;
      this.getOrderList();
    },
    // 第三种方法：滚动加载，通过npm插件实现
    scrollMore() {
      this.busy = true;
      setTimeout(() => {
        this.pageNum++;
        this.getList();
      },500)
    },
    // 专门给scrollMore使用
    getList() {
      this.loading = true;
      this.axios.get('/orders',{
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      }).then((res) => {
        this.loading = false;
        this.list = this.list.concat(res.list);
        //res.hasNextPage Boolean 是否有下一页
        if(res.hasNextPage) { 
          this.busy = false;
        } else {
          this.busy = true; //最后一页时,禁用滚动加载
        }
      })
    }
  },
}
</script>

<style lang="less">
@import './../assets/less/config.less';
@import './../assets/less/mixin.less';
.order-list{
  .wrapper{
    background-color: @colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box{
      .order{
        background-color: @colorG;
        #border();
        margin-bottom:31px;
        &:last-child{
          margin-bottom: 0;
        }
        .order-title{
          height: 74px;
          line-height: 74px;
          padding: 0 43px;
          background-color:@colorK;
          font-size:16px;
          color: @colorC;
          .item-info{
            span{
              margin: 0 9px;
            }
          }
          .money{
            font-size:26px;
            color: @colorB;
          }
        }
        .order-content{
          padding:0 43px;
          .good-box{
            width:88%;
            .good-list{
              display: flex;
              align-items: center;
              height:145px;
              .good-img{
                width:112px;
                img{
                  width: 100%;
                }
              }
              .good-name{
                font-size:20px;
                color: @colorB;
              }
            }
          }
          .good-state{
            height: 145px;
            line-height: 145px;
            font-size: 20px;
            // color: @colorA;
            a{
              color: @colorA;
            }
          }
        }
      }
      //分页器右对齐
      .pagination{
        text-align: right;
      }
      //分页器点击背景颜色
      .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #ff6600;
      }
      //加载更多居中
      .load-more{
        text-align: center;
      }
      //加载更多按钮主题色
      .el-button--primary{
        background-color: #ff6600;
        border-color: #ff6600;
      }
      //滚动加载更多居中
      .scroll-more{
        text-align: center;
      }
    }
  }
}
</style>