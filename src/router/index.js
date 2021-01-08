import Vue from 'vue'
import VueRouter from 'vue-router'
//延迟加载
const Home = () => import(/* webpackChunkName: "about" */ '../pages/home.vue')
const Index = () => import('../pages/index.vue')
const Product = () => import('../pages/product.vue')
const Detail = () => import('../pages/detail.vue')
const Cart = () => import('../pages/cart.vue')
const Order = () => import('../pages/order.vue')
const OrderConfirm = () => import('../pages/orderConfirm.vue')
const OrderList = () => import('../pages/orderList.vue')
const OrderPay = () => import('../pages/orderPay.vue')
const AliPay = () => import('../pages/alipay.vue')
const Login = () => import('../pages/login.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index', //重定向，默认跳转到index.vue
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index,
      },
      {
        path: '/product/:id',
        name: 'product',
        component: Product,
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: Detail,
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    children: [
      {
        path: 'list',
        name: 'order-list',
        component: OrderList
      },
      {
        path: 'confirm',
        name: 'order-confirm',
        component: OrderConfirm
      },
      {
        path: 'pay',
        name: 'order-pay',
        component: OrderPay
      },
      {
        path: 'alipay',
        name: 'alipay',
        component: AliPay
      },
    ]
  },
  

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  // mode: 'history',  //history模式（默认 哈希）
  base: process.env.BASE_URL,
  routes
})

export default router
