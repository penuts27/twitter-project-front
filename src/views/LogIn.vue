<template>
  <div class="container">
    <form class="" @submit.prevent.stop="handleSubmit">
      <div class="upper">
        <img class="logo" src="../assets/image/Logo.png" alt="">
        <h1 class="title">
          登入 Alphitter
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
        :disabled="isProcessing"
      >
        登入
      </button>

      <div class="">
        <p>
          <router-link to="/regist">註冊Alphitter</router-link>
          ·
          <router-link to="/adminlogin">後台登入</router-link>
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
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit (e) {
      try {
        console.log(e)
        // 如果 email 或 password 為空，則使用 Toast 提示
        // 然後 return 不繼續往後執行
        if (!this.account || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填入 account 和 password'
          })
          return
        }

        this.isProcessing = true

        const response = await authorizationAPI.signIn({
          account: this.account,
          password: this.password
        })

        const { data } = response
        // console.log('response', response)
        
        if (data.status !== 'success') {
          // console.log('error', data)
          throw new Error(data.message)
        }

        // console.log('token',data.data.token)
        localStorage.setItem('token', data.data.token)
      
        //將資料傳入vuex
        // console.log('data to veux',data.data.user)
        this.$store.commit('setCurrentUser', data.data.user)

        //成功後轉到首頁
        this.$router.push('/main')
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
      #account, #password{
        padding: 20px 0 0 10px;
        width: 540px;
        height: 52px;
        background-color:#F5F8FA;
        border: none;
        font-size: 19px;
        font-size: 500;
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
        font-weight: bold;
        line-height: 26px;
        text-align: center;
      }
      p{
        text-align:right;
        color: #0099FF;
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