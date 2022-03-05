<template>
  <div class="wrapper">
    <div class="gridWrapper">
      <div class="navbarWrapper">
        <Navbar />
      </div>
      <main>
        <div class="card-list">
          <div class="head">
                <i @click="$router.back()">
                    <img src="../assets/image/back.svg" alt="">
                </i>
                <div class="userInfo">
                    <h2>推文</h2>
                </div>
            </div>
        </div>
        <TweetDetail
        @after-reply-tweet="afterReplyTweet"/>
        <NoTweet
          v-if="!tweets.length"
          initText="尚沒有任何回復~"
          />
        <Tweet
         v-else
         v-for="tweet in tweets" 
         :key="tweet.id" 
         :initTweet="tweet"
         :initLikesAndReplies = false
         />
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
import TweetDetail from '../components/TweetDetail.vue'
import PopularUser from "../components/PopularUser.vue";
import tweetApis from '../apis/tweet'
import { Toast } from '../utils/helpers'
import NoTweet from '../components/Tweet/NoTweet.vue'
import { mapState } from 'vuex'

export default {
  name: 'Reply',
  components: {
    Navbar,
    PopularUser,
    TweetDetail,
    Tweet,
    NoTweet
  },
  data() {
    return {
      tweets: [],
    };
  },
  methods: {
    async fetchTweets(tweetId){
      try{
        const { data,statusText } = await tweetApis.getTweetReply({tweetId})
        // console.log('###',data)
        
        if(statusText !== 'OK'){
          throw new Error(statusText)
        }
        // tweet接收的資料格式，務必照此格式tweet才能正常顯示

        this.tweets = data.map(tweet => {
          const {comment, createdAt, updatedAt, id, User, Tweet} = tweet
          const {account, avatar, id:userId, name} = User
          return {
            id: id,
            UserId: userId,
            description: comment,
            createdAt: createdAt,
            updatedAt: updatedAt,
            userId: userId,
            User: {
                id: userId,
                name,
                account,
                avatar,
            },
            replyPerson: Tweet.User.name      
          }
        })
      }catch(error){
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無取取得推文回覆資料，請稍後再試'
        })
      }
    },
    afterReplyTweet(payload){
      const {id, description} = payload
      // 回傳前端假tweet物件
      const result = {
          id,
          UserId: this.currentUser.id,
          description,
          // replyPerson: ,
          // TODO:優化
          createdAt: new Date(),
          User: {
            name: this.currentUser.name,
            account: this.currentUser.account ? this.currentUser.account : '找不到帳戶',
            avatar: this.currentUser.avatar,
          }
      }
      // console.log('@@#',result)
      // 推進陣列
      this.tweets.unshift(result)
    }

  },
  created(){
    const id = this.$route.params.id
    this.fetchTweets(id)
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
  min-height: 100vh;
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
    .head{
          display: flex;
          align-items: center;
          background-color: $white;
          padding: 5px 20px;
          >i{
              display: flex;
              align-items: center;
              justify-content: center;
              // 點擊區域
              width: 44px;
              height: 44px;
              cursor: pointer;
          }
          .userInfo{
              display: flex;
              flex-direction: column;
              padding-left: 43px;
              >h2{
                @include font(18px, 1.4, normal, 700);
            }
          }
      }
  }
}
</style>