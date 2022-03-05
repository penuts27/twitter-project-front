<template>
  <div class="navbar">
    <img class="logo" src="../assets/image/Logo.png" alt="" />
    <ul class="nav">
      <li>
        <router-link class="" to="/admintweets">
          <img
            v-if="this.$route.name === 'admintweets'"
            class="icon"
            src="../assets/image/icon_index2.png"
            alt=""
          />
          <img
            v-else
            class="icon"
            src="../assets/image/icon_index.png"
            alt=""
          />
          推文清單
        </router-link>
      </li>
      <li>
        <router-link class="" to="/adminusers">
          <img
            v-if="this.$route.name === 'adminusers'"
            class="icon"
            src="../assets/image/icon_user2.png"
            alt=""
          />
          <img v-else class="icon" src="../assets/image/icon_user.png" alt="" />
          使用者列表
        </router-link>
      </li>
    </ul>
    <button class="log-out" @click="logOut">
      <img class="icon" src="../assets/image/icon_logout.png" alt="" />
      登出
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      // console.log("log out admin");
      this.$store.commit('revokeAuthentication')
      this.$router.push('/adminlogin')
    },
  },
};
</script>


<style lang="scss" scoped>
.navbar {
  width: 235px;
  height: 100%;
  position: absolute;
  right: 40px;
  .logo {
    width: 30px;
    position: absolute;
    top: 14px;
    left: 10px;
  }
  ul {
    position: absolute;
    top: 74px;
    li {
      width: 235px;
      height: 56px;
      position: relative;
      &:hover {
        color: $primary;
      }
      a {
        font-size: 18px;
        font-weight: bold;
        position: absolute;
        left: 10px;
        top: 15px;
        display: flex;
        align-items: center;
        &.active {
          color: $primary;
        }
        .icon {
          width: 24px;
          height: 24px;
          display: inline-block;
          margin-right: 20px;
        }
      }
    }
  }
  .log-out {
    padding: 0;
    position: absolute;
    left: 11px;
    bottom: 17px;
    width: 100px;
    height: 26px;
    font-family: Noto Sans TC;
    font-style: normal;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    &:hover {
      color: $primary;
    }
    img {
      width: 24px;
      height: 24px;
      display: inline-block;
      margin-right: 23px;
    }
  }
}
</style>