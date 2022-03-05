<template>
  <div class="wrapper">
    <Header :initUser="user"/>
    <PersonalCard :initUser="user"/>
    <UserNavTabs />
    <NoTweet
    v-if="!tweets.length"
    initText="該用戶目前沒有任何推文~"
    />
    <Tweet 
    v-else
    v-for="tweet in tweets" 
    :key="tweet.id" 
    :initTweet="tweet" />
  </div>
</template>

<script>
import Tweet from "../Tweet/Tweet.vue";
import UserNavTabs from "../UserNavTabs.vue";
import UsersApi from '../../apis/user'
import PersonalCard from "../PersonalCard.vue";
import { Toast } from "../../utils/helpers";
import NoTweet from '../Tweet/NoTweet.vue'
import Header from '../Header.vue'

export default {
  name: "TweetContent",
  components: {
    Tweet,
    PersonalCard,
    NoTweet,
    UserNavTabs,
    Header
  },
  data() {
    return {
      tweets: [],
      user: {
        id: -1,
        email: "",
        password: "",
        name: "",
        account: "",
        role: "",
        avatar: "",
        introduction: "",
        cover: "",
        tweetCount: null,
        followingCount: null,
        followerCount: null,
        likedCount: null,
        createdAt: "",
        updatedAt: "",
        isFollowed: false
      },
    };
  },
  methods: {
    async fetchTweets(userId) {
      // console.log(userId);
      try {
        const { data, statusText } = await UsersApi.getUserTweets({ userId });
          //  console.log('**',data)
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.tweets = data;
      } catch (error) {
        console.log("error", error.message);
        Toast.fire({
          icon: "error",
          title: "未能取得使用者推文，請稍後再試",
        });
      }
    },
    //更改推文名稱、圖片
    // afterReceiveProfileChange(dataFromPersonalCard){
    //   const data = dataFromPersonalCard
    //   console.log('data', data)
    //   this.user = {
    //     ...this.user,
    //     avatar: data.user.avatar,
    //     name: data.user.name

    //   }
    // },
    async fetchUser(userId) {
      try {
        const { data, statusText } = await UsersApi.getUser({ userId });
        // console.log("$$", data);
        const {
          id,
          email,
          name,
          account,
          role,
          avatar,
          introduction,
          cover,
          tweetCount,
          followingCount,
          followerCount,
          likedCount,
          createdAt,
          updatedAt,
          isFollowed
        } = data
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.user = {
          ...this.user,
          id,
          email,
          name,
          account,
          role,
          avatar,
          introduction,
          cover,
          tweetCount,
          followingCount,
          followerCount,
          likedCount,
          createdAt,
          updatedAt,
          isFollowed
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  },
  created() {
    const id = this.$route.params.id;
    this.fetchUser(id);
    this.fetchTweets(id);
  },
};
</script>

<style lang="scss" scoped>
.wrapper{
    height: 100%;
}
</style>