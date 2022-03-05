<template>
  <div class="container">
    <form class="" @submit.prevent.stop="handleSubmit">
      <div class="upper">
        <img class="logo" src="../assets/image/Logo.png" alt="">
        <h1 class="title">
          建立你的帳號
        </h1>
      </div>
      <div class="input-box">
        <label for="account">帳號</label>
        <input
          id="account"
          v-model="account"
          name="account"
          type="account"
          class="form-control"
          autocomplete="username"
          required
          autofocus
        >
      </div>
      <div class="input-box">
        <label for="account">名稱</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="name"
          class="form-control"
          autocomplete="name"
          required
          autofocus
        >
      </div>
      <div class="input-box">
        <label for="account">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          autocomplete="email"
          required
          autofocus
        >
      </div>
      <div class="input-box">
        <label for="password">密碼</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          autocomplete="current-password"
          required
        >
      </div>
      <div class="input-box">
        <label for="checkPassword">密碼確認</label>
        <input
          id="checkPassword"
          v-model="checkPassword"
          name="passwordCheck"
          type="password"
          class="form-control"
          required
        >
      </div>
      <button
        class="sign-up"
        type="submit"
      >
        註冊
      </button>
      <div class="cancel">
        <p>
          <router-link to="/login">取消</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'

export default {
  data () {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      checkPassword: ''
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if (
          !this.account ||
          !this.name ||
          !this.email ||
          !this.password ||
          !this.checkPassword
        ) {
          Toast.fire({
            icon: 'warning',
            title: '請確認已填寫所有欄位'
          })
          return
        }
        if (this.password !== this.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '兩次輸入的密碼不同'
          })
          this.checkPassword = ''
          return
        }
        const { data } = await authorizationAPI.signUp({
          account:this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword
        })
        console.log(data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: data.message
        })
        // 成功登入後轉址到登入頁
        this.$router.push('/login')
      } catch (error) {
        
        console.log(error)
        Toast.fire({
          icon: 'warning',
          title: `無法註冊 - ${error.message}`
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    form{
      width: 540px;
      margin: 64px auto;
      .upper{
        .logo{
          margin: 0 auto;
          width: 50px;
          height: 50px;
        }
        .title{
          text-align:center;
          margin: 20px auto 40px auto;
          font-family: Noto Sans TC;
          font-style: normal;
          font-size: 23px;
          font-weight: bold;
        }
      }
      .input-box{
        position: relative;
        margin-bottom: 32px;
        background-color:#F5F8FA;
        width: 540px;
        border-bottom: solid 2px #657786;
        border-radius: 0px 0px 4px 4px;
        label{
          font-weight: 500;
          font-size: 15px;
          line-height: 15px;
          color: #657786;
          position: absolute;
          left: 10px;
          top: 5px;
        }
      }
      #account, #name, #email, #password, #checkPassword{
        padding: 20px 0 0 10px;
        height: 52px;
        background-color:#F5F8FA;
        border: none;
        font-size: 19px;
        line-height: 28px;
        &:focus {
          outline: none;
        }
      }
      .sign-up{
        margin: 10px auto 20px auto;
        width: 540px;
        height: 46px;
        background: $primary;
        border-radius: 50px;
        color: white;
        font-size: 18px;
        font-weight: bold;
        line-height: 26px;
        text-align: center;
      }
      p{
        text-align:center;
        a{
          color: #0099FF;
          font-size: 18px;
          font-weight: bold;
          text-decoration-line: underline;
        }
      }
    }
  }
  
</style>