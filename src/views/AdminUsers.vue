<template>
  <div class="container">
    <div class="left-column">
      <AdminNavbar />
    </div>
    <main>
      <div class="header">
        <h1>使用者列表</h1>
      </div>
      <div class="card-board">
        <UserCard 
          v-for="user in users"
          :key="user.id"
          :initial-user="user"
        />
      </div>
    </main>
  </div>
</template>

<script>
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

import AdminNavbar from "./../components/AdminNavbar";
import UserCard from "./../components/UserCard";
export default {
  components: {
    AdminNavbar,
    UserCard,
  },
  data() {
    return {
      users:[],
    };
  },
  created(){
    this.fetchUsers()
  },
  methods:{
    async fetchUsers () {
  try {
    const { data } = await adminAPI.adminGetUsers()
    // console.log(data)
    // this.test = data.map(user => ({
    //   id: user.id,
    //   name: user.name,
    //   image: user.image,
    //   followerCount: user.FollowerCount,
    //   isFollowed: user.isFollowed
    // }))
    this.users = data
  } catch (error) {
    console.log(error)
    Toast.fire({
      icon: 'error',
      title: '無法取得users，請稍後再試'
    })
  }
},
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1260px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 600px auto;
  grid-template-rows: auto;
  grid-template-areas: "navbar main main ";
  height: 100vh;
  position: relative;
  .left-column {
    position: relative;
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
    .card-board{
      max-width: 1040px;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>