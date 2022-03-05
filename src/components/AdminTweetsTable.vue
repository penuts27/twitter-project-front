<template>
  <ul>
    <li>
      <div class="list">
        <div class="user-photo">
          <img class="avatar" :src="tweet.avatar" alt="" />
        </div>
        <div class="content">
          <span class="name">{{ tweet.username }}</span>
          <span class="account-date"
            >@{{ tweet.account }}·{{ tweet.createdAt | fromNow }}</span
          >
          <div class="tweet-content">
            {{ Number(tweet.shortd_escription.length) === 50 ? tweet.shortd_escription +'...' : tweet.description}}
          </div>
        </div>
        <button class="destroy" @click="deleteTweet(tweet.id)">
          <img
            class="d-inline-block"
            src="../assets/image/icon_close.png"
            alt=""
          />
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import moment from "moment";

export default {
  props: {
    initialTweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweet: this.initialTweet,
    };
  },
  created() {},
  methods: {
    deleteTweet(TweetID){
      // console.log('emit delete tweet id:', TweetID)
      this.$emit('after-delete-tweet', TweetID)
    }
  },
  filters: {
    fromNow(datetime) {
      if (!datetime) {
        return "-";
      }
      // 使用moment 提供的fromNow 方法
      return moment(datetime).fromNow();
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  .list {
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #e6ecf0;
    .user-photo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 13px 15px;
      .avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .content {
      margin: 10px 0 15px 0;
      .name {
        font-size: 15px;
        font-weight: 700;
        margin-right: 5px;
      }
      .account-date {
        font-size: 15px;
        font-weight: 500;
        color: #657786;
      }
      .tweet-content {
        font-size: 15px;
        font-weight: 500;
        max-width: 600px;
        margin-top: 6px;
      }
    }
    .destroy {
      width: 24px;
      height: 24px;
      position: absolute;
      right: 15px;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>