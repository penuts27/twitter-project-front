<template>
  <div class="wrapper">
    <div class="gridWrapper">
      <div class="navbarWrapper">
        <Navbar @after-create-tweet-from-navbar="afterCreateTweetFromNavbar"/>
      </div>
      <main>
        <div class="user-list">
          <h2 class="title">上線使用者<span>(5)</span></h2>
          <div class="online-user-card" v-for="onlineUser in onlineUsers" :key="onlineUser.userId">
            <Avatar :initImage="onlineUser.avatar" :initUserId="onlineUser.userId"/>
            <div class="user-info">
                <div class="name">{{onlineUser.name}}</div>
                <div class="account">{{onlineUser.account}}</div>
            </div>
        </div>
        </div>
          <div class="chat-room-box">
            <ChatRoom :initMessages="messages" :initSocket="socket">
              <h2 class="title">公開聊天室</h2>
            </ChatRoom>
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
import { io } from "socket.io-client";

// const dummyData = [
//   {
//     userId: 274,
//     avatar: 'https://gravatar.com/avatar/7171d4a3173dbc64468bbb0ac241ec8d?s=400&d=robohash&r=x',
//     name: 'robot1',
//     account: 'robot1'
//   },
//   {
//     userId: 275,
//     avatar: 'https://gravatar.com/avatar/8e92f23f6d7f67cb0e00edfbba39d02f?s=400&d=robohash&r=x',
//     name: 'robot2',
//     account: 'robot2'
//   },
//   {
//     userId: 276,
//     avatar: 'https://gravatar.com/avatar/78470cf2ae4b1d25cbda7950389b06d2?s=400&d=robohash&r=x',
//     name: 'robot3',
//     account: 'robot3'
//   }
// ]

export default {
  name: 'ChateRoomPublic',
  components: {
    Navbar,
    Avatar,
    ChatRoom,
  },
  data() {
    return {
      tweets: [],
      onlineUsers: [],
      messages: [],
      socket: null
    };
  },
  methods: {
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
    }
  },
  created(){
    this.fetchTweets()
  },
  mounted(){
        const getToken = () => localStorage.getItem('token')
        const socket = io("https://sheltered-ravine-31386.herokuapp.com/",{
            auth: {
                token: getToken()
            }
        });
        
        this.socket = socket 

        // // 進入聊天室時，會收到之前的全部訊息，並更新到 messages
        // this.socket.on('all messages', data => {
        //     this.messages = data
        // })
        
        // 設定接收到新訊息的監聽器
        // socket持續接收server回傳資訊
        this.socket.on('userList', data => {
          console.log('@',data)
          this.onlineUsers = data
        })
        this.socket.on('chat message', obj => {
          console.log('$', obj)
            // message傳給子組件
            this.messages.push(obj)
        })
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
    width: 60%;
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