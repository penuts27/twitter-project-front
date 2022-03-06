<template>
  <div class="wrapper">
    <div class="gridWrapper">
      <div class="navbarWrapper">
        <Navbar @after-create-tweet-from-navbar="afterCreateTweetFromNavbar"/>
      </div>
      <main>
        <div class="user-list">
          <h2 class="title">上線使用者<span>(5)</span></h2>
          <div class="online-user-card">
            <Avatar/>
            <div class="user-info">
                <div class="name">apple</div>
                <div class="account">apple</div>
            </div>
        </div>
        </div>
        <div class="chat-room-box">
          <h2 class="title">公開聊天室</h2>
          <div class="chat-content-box">
            <ChatRoom/>
          </div>
        </div>
      </main>

    </div>
  </div>
</template>
<script src="/socket.io/socket.io.js"></script>
<script>
import Navbar from "../components/Navbar.vue";
import tweetApis from '../apis/tweet'
import { Toast } from '../utils/helpers.js'
import { mapState } from 'vuex'
import Avatar from '../components/Avatar.vue'
import ChatRoom from '../components/ChateRoom.vue'

export default {
  name: 'Main',
  components: {
    Navbar,
    Avatar,
    ChatRoom,
  },
  data() {
    return {
      tweets: []
    };
  },
  // sockets: {
  //   connect: function(){
  //     console.log('socket connection')
  //   },
  //   customEmit: function(data){
  //     console.log('this methods')
  //   }
  // },
  methods: {
    async afterCreateTweet(payload) {
      const {id, description} = payload
      // 回傳前端假tweet物件
      const result = {
          id,
          UserId: this.currentUser.id,
          description,
          // TODO:優化
          createdAt: new Date(),
          likeCount: 0,
          replyCount: 0,
          User: {
            name: this.currentUser.name,
            account: this.currentUser.account ? this.currentUser.account : '找不到帳戶',
            avatar: this.currentUser.avatar,
          },
      }
      try{
        // 前端手動更新
        this.tweets.unshift(result) 
        // post請求
        const {statusText} = await tweetApis.createTweet(result)
        if(statusText !== 'OK'){
          throw new Error(statusText)
        }

      }catch(error){
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法新增推文，請稍後再試'
        })
      }
    },
    // 接收navbar推文資料///
    afterCreateTweetFromNavbar(fromNavbar){
      // console.log('receive from navbar', fromNavbar)
      const {id, description} = fromNavbar.content
      const result2 = {
          id,
          UserId: this.currentUser.id,
          description,
          // TODO:優化
          createdAt: new Date(),
          User: {
            name: this.currentUser.name,
            account: this.currentUser.account ? this.currentUser.account : '找不到帳戶',
            avatar: this.currentUser.avatar,
          },
          likeCount: 0,
          replyCount: 0,
      }
      this.tweets.unshift(result2)
    },
    // 接收navbar推文資料///
    async fetchTweets(){
      try{
        const { data,statusText } = await tweetApis.getMainTweet()
        // console.log('###',data)
        // 資料類型
        // User:{
        //   account:"user1"
        //   avatar:"https://loremflickr.com/320/240/people"
        //   id:2
        //   name:"Wendell Russel MD"
        // }
        // UserId:2
        // createdAt:"2022-02-26T12:28:53.000Z"
        // description:"123456"
        // id:74
        // likedCount:null
        // replyCount: 3
        // updatedAt:"2022-02-26T12:28:53.000Z"
 
        if(statusText !== 'OK'){
          throw new Error(statusText)
        }
        this.tweets = data
      }catch(error){
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無取取得資料，請稍後再試'
        })
      }
    },
    // socketConnect(){
    //   console.log(111)
    //   this.$socket.emit('emit_method')
    // }
  },
  created(){
    this.fetchTweets()
    // this.socketConnect()
  },
  computed: {
          ...mapState(['currentUser'])
   }
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_variables.scss';
@import '../assets/style/_reset.scss';
@import '../assets/style/_base.scss';
@import '../assets/style/_mixin.scss';
.wrapper {
  .gridWrapper {
    max-width: 1260px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto;
    gap: 30px;
  }
}
.navbarWrapper {
  display: block;
  /* border: 1px solid #000; */
  height: 100%;
  /* min-height: 100vh; */
}
main {
  width: 100%;
  display: flex;
  border: 1px solid $border;
  h2.title{
    padding: 24px;
    border-bottom: 1px solid $border;
    @include font(24px, 1, normal, 700);
  }
  .user-list{
    width: 40%;
    border: 1px solid $border;
  }
  .chat-room-box{
    display: flex;
    flex-direction: column;
    width: 60%;
    border: 1px solid $border;
    .chat-content-box{
      height: 100%;
    }
  }
  .online-user-card{
    display: grid;
    grid-template-columns: 50px auto;
    grid-template-rows: auto;
    gap: 10px;
    padding: 15px;
    border-bottom: 1px solid $border;
    .user-info{
      display: flex;
      align-items: center;
      .name{
        margin-right: 5px;
        color: $black;
        @include font(16px, 26px, normal, 700);
      }
      .account{
        color: $dark-grey;
        @include font(16px, 26px, normal, 400);
        &:before{
          content: '@';
        }
      }
    }
  }
}
</style>