<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt=""></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">账号登录</span><span class="sep-line">|</span><span>扫码登陆</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入账号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
      <a href="https://home.miui.com/" target="_blank">MIUI</a><span>|</span>
      <a href="javascript:;">米家</a><span>|</span>
      <a href="javascript:;">米聊</a><span>|</span>
      <a href="javascript:;">多看</a>
      </div>
      <p class="copyright"> © mi.com 京ICP证110507号 京ICP备10046444号 京公网安备11010802020134号 京网文[2020]0276-042号</p>
    </div>
  </div>
</template>

<script>
// 引入mapActions
import { mapActions } from 'vuex';

export default {
  name: 'login',
  data() {
    return {  
      username: '',
      password: '',
      userId: ''
    }
  },
  methods: {
    login() {
      let {username,password} = this;
      this.axios.post('/user/login', {
        username,
        password
      }).then(res => {
        // 设置userId为res.id，过期时间为1个月
        this.$cookie.set('userId',res.id,{expires: 'Session'});
        // 保存用户名 1 saveUserName方法，res.username参数，下一步actions
        // this.$store.dispatch('saveUserName', res.username); 
        this.saveUserName(res.username);
        // this.$router.push('/index');
        this.$router.push({   //params传参，url不变，参数在this.$route.params取得,相等于post请求传参
          name: 'index',
          params: {
            from: 'login'
          }
        });
        // this.$router.push({ //query传参，url会拼接上from=login，参数在this.$route.params取得,相等于get请求传参
        //   path: '/index',
        //   query: {
        //     from: 'login'
        //   }
        // });

      })
    },
    // 使用mapActions  (dispatch的简写模式)
    ...mapActions(['saveUserName']),
    register() {
      this.axios.post('/user/register', {
        username: 'admin225',
        password: 'admin225',
        email: 'admin225@163.com'
      }).then((res) => {
        // this.$message.success('注册成功');
        alert(res.msg);
      })
    }
  }
}
</script>

<style lang="less">
.login{
  &>.container{
    height: 113px;
    img{
      width: auto;
      height: 100%;
    }
  }
  .wrapper{
    background: url('/imgs/login-bg.jpg') no-repeat center;
    .container{
      height: 576px;
      .login-form{
        box-sizing: border-box;
        position: absolute;
        bottom: 29px;
        right: 0;
        width: 410px;
        height: 510px;
        padding: 0 31px;
        background-color: #fff;
        h3{
          height: 23px;
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          .checked{
            color: #FF6600;
          }
          .sep-line{
            margin: 0 32px;
          }
        }
        .input{
          box-sizing: border-box;
          display: inline-block;
          // width:348px;
          width: 100%;
          height:50px;
          border: 1px solid #E5E5E5;
          margin-bottom: 20px;
          input{
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn{
          width: 100%;
          height: 50px;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips{
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms{
            color:#FF6600;
          }
          .reg{
            color:#999999;
            span{
              margin:0 7px;
            }
          }
        }
      }
    }
  }
  .footer{
    height: 100px;
    padding-top: 60px;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-link{
      a{
        color:#999999;
        display: inline-block;
      }
      span{
        margin: 0 10px;
      }
    }
    .copyright{
      margin-top:13px;
    }
  }
}
</style>