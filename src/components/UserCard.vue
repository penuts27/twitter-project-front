<template>
  <div class="main">
    <div class="cover">
      <img
        class="cover-photo"
        :src="user.cover"
        alt=""
      />
    </div>
    <div class="content">
      <div class="user-photo">
        <img class="avatar" :src="user.avatar" />

      </div>
      <div class="name">{{ user.name }}</div>
      <span class="account">@{{ user.account }}</span>
      <div class="counts">
        <div class="count tweets">
          <img class="icon icon-tweet" src="../assets/image/message.svg" />
          <span class="count-number">{{user.tweetCount}} </span>
        </div>
        <div class="count likes">
          <img class="icon icon-like" src="../assets/image/favorite.svg" />
          <span class="count-number">{{user.likedCount}} </span>
        </div>
      </div>
      <div class="follow">
        <span class="following-count">{{user.followingCount}} 個</span>
        <span class="following">跟隨中</span>
        <span class="followed-count">{{user.followerCount}} 位</span>
        <span class="followed">跟隨者</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: this.initialUser,
    };
  },
};
</script>


<style lang="scss" scoped>
.main {
  width: 245px;
  height: 314px;
  background: #c4c4c4;
  border-radius: 10px;
  position: relative;
  margin: 15px 0 0 15px;
  .cover {
    width: 245px;
    height: 140px;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    .cover-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    background: #f6f7f8;
    border-radius: 0 0 10px 10px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 174px;
    text-align: center;
    .user-photo {
      position: absolute;
      top: -72px;
      left: 72.5px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 4px solid #ffffff;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .name {
      width: 100%;
      height: 22px;
      font-size: 15px;
      font-weight: 900;
      margin: 33px 0 0 0;
    }
    .account {
      margin-top: 2px;
      height: 22px;
      font-size: 15px;
      color: #657786;
    }
    .counts {
      height: 24px;
      margin-top: 15px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      .count {
        font-size: 15px;
        font-weight: 500;
        &.tweets {
          margin-right: 15px;
        }
        .count-number {
          vertical-align: middle;
        }
        .icon {
          display: inline-block;
          vertical-align: middle;
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }
      }
    }
    .follow {
      height: 20px;
      margin-top: 15px;
      font-size: 14px;
      font-weight: 500;
      .following,
      .followed {
        color: #657786;
      }
      .following {
        margin-right: 5px;
      }
    }
  }
}
</style>

