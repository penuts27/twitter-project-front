// ./src/views/SignIn.vue
<template>
  <div class="container">
    <form class="" @submit.prevent.stop="handleSubmit">
      <div class="upper">
        <img class="logo" src="../assets/image/Logo.png" alt="">
        <h1 class="title">
          後台登入
        </h1>
      </div>

      <div class="input-box">
        <label for="adminAccount">帳號</label>
        <input
          id="adminAccount"
          v-model="adminAccount"
          name="adminAccount"
          type="account"
          class="form-control"
          autocomplete="username"
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

      <button
        class="sign-in"
        type="submit"
      >
        登入
      </button>

      <div class="front-sign-in">
        <p>
          <router-link to="/login">前台登入</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  data () {
    return {
      adminAccount: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit (e) {
      try {
        console.log(e)
        // 如果 email 或 password 為空，則使用 Toast 提示
        // 然後 return 不繼續往後執行
        if (!this.adminAccount || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填入 account 和 password'
          })
          return
        }

        this.isProcessing = true

        const response = await adminAPI.adminSignIn({
          account: this.adminAccount,
          password: this.password
        })

        const { data } = response
        // console.log('response', response)
        
        if (data.status !== 'success') {
          // console.log('errpr', data)
          throw new Error(data.message)
        }

        localStorage.setItem('token', data.data.token)
        

        //將資料傳入vuex
        // console.log(data.data.user)
        this.$store.commit('setCurrentUser', data.data.user)

        //成功後轉到首頁
        this.$router.push('/admintweets')
      } catch (error){
        this.password = ''
        // 顯示錯誤提示
        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入了正確的帳號密碼'
        })
        this.isProcessing = false
        console.log('error', error)
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
      #adminAccount, #password{
        padding: 20px 0 0 10px;
        width: 540px;
        height: 52px;
        background-color:#F5F8FA;
        border: none;
        font-size: 19px;
        font-weight: 500;
        font-family: Noto Sans TC;
        font-style: normal;
        line-height: 28px;
        &:focus {
          outline: none;
        }
      }
      .sign-in{
        margin: 10px auto 20px auto;
        width: 540px;
        height: 46px;
        background: $primary;
        border-radius: 50px;
        color: white;
        font-family: Noto Sans TC;
        font-style: normal;
        font-size: 18px;
        font-weight: 700;
        line-height: 26px;
        text-align: center;
      }
      p{
        text-align:right;
        color: #0099FF;
        a{
          color: #0099FF;
          font-size: 18px;
          font-weight: 700;
          text-decoration-line: underline;
        }
      }
    }
  }
</style>