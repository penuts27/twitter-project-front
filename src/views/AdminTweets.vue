<template>
  <div class="container">
    <div class="left-column">
      <AdminNavbar />
    </div>
    <main>
      <div class="header">
        <h1>推文清單</h1>
      </div>
      <div class="list-board">
        <AdminTweetsTable 
          v-for="tweet in tweets"
          :key="tweet.id"
          :initial-tweet = "tweet"
          @after-delete-tweet="afterDeleteTweet"
        />
      </div>
    </main>
  </div>
</template>


<script>
import AdminNavbar from "./../components/AdminNavbar";
import AdminTweetsTable from "./../components/AdminTweetsTable";
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  components: {
    AdminNavbar,
    AdminTweetsTable,
  },
  data(){
    return {
      tweets: []
    }
  }
  ,
  created(){
    this.fetchTweets()
  },
  methods: {
    async fetchTweets(){
      try{
        const {data} = await adminAPI.adminGetTweets()

        // console.log(data.tweets)
        this.tweets = data.tweets

      } catch(error){
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: `無法取得推文，請稍後再試: ${error.message}`
        })
      }
    },
    async afterDeleteTweet(TweetID){
      try{
        const result = await adminAPI.adminDeleteTweet(TweetID)
        console.log(result)
        console.log('receive request delete ',TweetID)
        this.tweets = this.tweets.filter( tweet => tweet.id !== TweetID)
      } catch(error){
        console.log('error happend', error)
      }
    }
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
    .list-board{
      max-width: 1040px;
    }
  }
}
</style>