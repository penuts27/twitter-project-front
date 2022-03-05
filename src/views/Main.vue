<template>
  <div class="wrapper">
    <div class="gridWrapper">
      <div class="navbarWrapper">
        <Navbar @after-create-tweet-from-navbar="afterCreateTweetFromNavbar"/>
      </div>
      <main>
        <div class="card-list">
          <h2>首頁</h2>
          <UserCreateTweet @after-create-tweet="afterCreateTweet" />
          <NoTweet
          v-if="!tweets.length"
          initText="努力加載中~"
          />
          <Tweet 
          v-else
          v-for="tweet in tweets"
          :key="tweet.id" 
          :initTweet="tweet"/>
        </div>
      </main>
      <div class="popularList">
        <PopularUser />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Tweet from "../components/Tweet/Tweet.vue";
import PopularUser from "../components/PopularUser.vue";
import UserCreateTweet from "../components/UserCreateTweet.vue";
import tweetApis from '../apis/tweet'
import { Toast } from '../utils/helpers.js'
import { mapState } from 'vuex'
import NoTweet from '../components/Tweet/NoTweet.vue'

export default {
  name: 'Main',
  components: {
    Navbar,
    UserCreateTweet,
    PopularUser,
    Tweet,
    NoTweet
  },
  data() {
    return {
      tweets: []
    };
  },
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
    }

  },
  created(){
    this.fetchTweets()
  },
  computed: {
          ...mapState(['currentUser'])
   }
};
</script>

<style lang="scss" scoped>
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
.popularList {
  /* border: 1px solid #000; */
  width: 350px;
  height: 1000px;
}
main {
  background-color: $border;
  width: 100%;
  height: 1200px;
  border: 1px solid $border;
  .card-list {
    > h2 {
      padding: 15px;
      border-bottom: 1px solid $border;
      background-color: $white;
      @include font(18px, 1.4, normal, 700);
    }
  }
}
</style>