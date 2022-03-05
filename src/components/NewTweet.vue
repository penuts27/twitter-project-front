<template>
  <button class="post" @click="showModal = true, clearTweetContent()" >
    推文
    <Modal class="light-box" v-model="showModal">
      <form action="" @submit.prevent.stop="sendPost">
        <div class="tweet-modal-content">
          <div class="user-photo-container">
            <img class="post-tweet-avatar" :src="currentUser.avatar" alt="" />
          </div>
          <textarea
            name=""
            id=""
            placeholder="有什麽新鮮事？"
            v-model="tweetContent"
          ></textarea>
        </div>
        <p class="alert-text" v-show="alertMessage">{{ alertMessage }}</p>
        <button class="post-tweet" type="submit">推文</button>
      </form>
    </Modal>
  </button>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "../utils/helpers.js";
import tweetApis from "../apis/tweet";

export default {
  data() {
    return {
      showModal: false,
      tweetContent: "",
      alertMessage: "",
      isProcessing: false,
    };
  },
  methods: {
    async sendPost() {
      // console.log(this.$route)
      try {
        // console.log("送出推文:", this.tweetContent);
        // 阻擋空白/140字以上發文，並發出警示文字
        if (!this.tweetContent.trim()) {
          return (this.alertMessage = "上面沒有内容捏。");
        }
        if (this.tweetContent.length > 140) {
          return (this.alertMessage = "廢話少説，最多140字。");
        }

        this.isProcessing = true;

        const response = await tweetApis.createTweet({
          description: this.tweetContent,
          createdAt: new Date(),
        });
        const { data } = response;
        // console.log("response", response);

        if (response.status !== 200) {
          // console.log("error", data);
          throw new Error(data.message);
        }
        //送出内容到外層
       this.$emit('after-create-tweet-from-modal',{
          id: this.currentUser.id,
          description: this.tweetContent
        })
        ///////////////////////
        this.tweetContent = "";
        this.showModal = false;
        this.$router.push('/main')
 
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法新增推文，請稍後在試",
        });
        this.isProcessing = false;
      }
    },
    clearTweetContent(){
      this.tweetContent = "";
      this.alertMessage = ""
    }
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>

<style lang="scss" scoped>
.post {
  width: 210px;
  height: 38px;
  background: $primary;
  border-radius: 100px;
  justify-content: center;
  line-height: 38px;
  color: white;
  font-size: 18px;
  font-weight: bold;
}
//modal style
.vm {
  .tweet-modal-content {
    display: flex;
    height: 245px;

    .user-photo-container {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 15px 10px auto 15px;
      .post-tweet-avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    textarea {
      resize: none;
      border: none;
      width: 510px;
      height: 165px;
      margin-top: 27px;
      font-size: 18px;
      font-weight: 500;
      font-family: Noto Sans TC;
      font-style: normal;
    }
  }
  .alert-text {
    position: absolute;
    right: 100px;
    bottom: 20px;
    color: $warring;
  }
  .post-tweet {
    width: 66px;
    height: 38px;
    font-size: 18px;
    font-weight: 500;
    font-family: Noto Sans TC;
    font-style: normal;
    color: white;
    background-color: $primary;
    border-radius: 100px;
    position: absolute;
    right: 15px;
    bottom: 15px;
  }
}
</style>