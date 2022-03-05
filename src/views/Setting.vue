<template>
  <div class="container">
    <div class="left-column">
      <Navbar />
    </div>
    <main>
      <div class="header">
        <h1>帳戶設定</h1>
      </div>
      <form class="main-form" @submit.stop.prevent="setUserInfo">
        <div class="input-box">
          <label for="account">帳號</label>
          <input
            id="account"
            v-model="account"
            name="account"
            type="account"
            class="form-control"
            required
            autofocus
          />
        </div>
        <div class="input-box">
          <label for="account">名稱</label>
          <input
            id="name"
            v-model="name"
            name="name"
            type="name"
            class="form-control"
            required
            autofocus
          />
        </div>
        <div class="input-box">
          <label for="account">Email</label>
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            class="form-control"
            required
            autofocus
          />
        </div>
        <div class="input-box">
          <label for="password">密碼</label>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            class="form-control"
            required
          />
        </div>
        <div class="input-box">
          <label for="checkPassword">密碼確認</label>
          <input
            id="checkPassword"
            v-model="checkPassword"
            name="checkPassword"
            type="password"
            class="form-control"
            required
          />
        </div>
        <button class="save" type="submit" :disabled="isProcessing">儲存</button>
      </form>
    </main>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import userAPI from './../apis/user'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
      isProcessing: false
    };
  },
  methods: {
    async setUserInfo(e) {
      try{
        //驗證不爲空值
        if (!this.account || !this.name || !this.email || !this.password || !this.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '請確認填入所有資訊'
          })
          return
        } 
        if (this.name.length > 50) {
          Toast.fire({
            icon: 'warning',
            title: '暱稱不可大於50字'
          })
          return
        } 
        const form = e.target  // <form></form>
        const formData = new FormData(form)

        this.isProcessing = true

        const {data} = await userAPI.updateUser({
          userId: this.currentUser.id,
          formData
        })
        // console.log(data)

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // this.$router.go(0)
        this.$router.push({ name: 'user-tweets', params: { id: this.currentUser.id }})
        // this.$router.push('login')
        
      } catch(error){
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新資料，請稍後再試'
        })
      }
    },
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: auto 600px auto;
  grid-template-rows: auto;
  grid-template-areas: "navbar main main ";
  height: 100vh;
  position: relative;
  .left-column {
    position: relative;
    .navbar{
      position: absolute;
      
    }
  }
  main {
    border: 1px solid #e6ecf0;
    grid-area: main;
    .header {
      height: 55px;
      border-bottom: 1px solid #e6ecf0;
      position: relative;
      h1 {
        font-size: 19px;
        position: absolute;
        top: 13px;
        left: 20px;
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
    width: 540px;
    margin: 30px auto auto 16px;
    .input-box {
      position: relative;
      margin-bottom: 32px;
      background-color: #f5f8fa;
      width: 540px;
      border-bottom: solid 2px #657786;
      border-radius: 0px 0px 4px 4px;
      label {
        font-weight: 500;
        font-size: 15px;
        line-height: 15px;
        color: #657786;
        position: absolute;
        left: 10px;
        top: 5px;
      }
    }
    #account,
    #name,
    #email,
    #password,
    #checkPassword {
      padding: 20px 0 0 10px;
      width: 540px;
      height: 52px;
      background-color: #f5f8fa;
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
    .save {
      margin: 10px auto 20px auto;
      width: 116px;
      height: 46px;
      background: $primary;
      border-radius: 50px;
      color: white;
      font-size: 18px;
      font-weight: bold;
      line-height: 26px;
      text-align: center;
      margin-right: 0;
    }
  }
}
</style>