<template>
  <button class="icon-button" @click.stop.prevent="showMainReplyModal=true">
    <img class="img" src="../assets/image/icon_tweet.png" alt="">
    <Modal class="light-box" v-model="showMainReplyModal">
      <div class="reply-modal">
        <div class="tweet-wrapper">
          <Avatar 
          :initUserId="initTweet.userId"
          :initImage="initTweet.image"
          />  
          <!-- :initUserId="" -->
          <div class="tweet-body">
            <div class="tweet-name">
                <div class="name">{{replyObject.name}}</div>
                <div class="account-name">{{replyObject.account}}</div>
                <div class="update-time">{{ replyObject.createdAt | fromNow }}</div>
            </div>
            <div class="tweet-content">
              {{replyObject.description}}
            </div>
            <div class="replyPerson" >
                <span>回覆給</span>
                <div class="account-name">
                  {{replyObject.account}}
                </div>
            </div>
            <div class="reaction">
            </div>
          </div>
        </div>
        <div class="straight-line">
          
        </div>
        <div class="form">
          <div class="your-reply">
            <div class="user-photo-container">
              <img class="user-photo" :src="currentUser.avatar" alt="">
            </div>
            <textarea v-model="replyTweetContent" name="" id="" placeholder="推你的回覆">

            </textarea>
            <button @click.stop.prevent="createReply(initTweet.id)" class="reply" type="submit">
              回覆
            </button>
          </div>
        </div>
      </div>

    </Modal>
  </button>

</template>

<script>
import { mapState } from 'vuex'
import Avatar from '../components/Avatar.vue'
import tweetsApi from '../apis/tweet'
import { Toast } from '../utils/helpers'
import moment from 'moment'
import uuid from 'uuid'

  export default {
    components: {
        Avatar
    },
    props: {
      // 被回覆的人的資料
      initTweet:{
        type: Object,
        require: true
      }
    },
    data(){
      return{
        replyObject: {
          uerId: this.initTweet.userId,
          name: this.initTweet.name,
          account: this.initTweet.accountName,
          image: this.initTweet.image,
          createdAt: this.initTweet.createdAt,
          description: this.initTweet.description
        },
        showMainReplyModal: false,
        replyTweetContent: "",
        isLoading: false,
      }
    },
    methods:{
      async createReply(tweetId){
        // 若loading則不執行
        if(this.isLoading === true) return
        try{
          // 發送前為處理中
          this.isLoading = true
          const {statusText} = await tweetsApi.replyTweet({
            comment: this.replyTweetContent,
            tweetId
          })
          // console.log('@@#', data)
          if(statusText !== 'OK'){
            throw new Error(statusText)
          }
           // 發送至tweet，首頁功能:請他+1評論/詳細推文頁:可立即產生的假卡片資料
           this.$emit("after-reply-tweet",{
             description: this.replyTweetContent,
             id: uuid()
           })
           // 清空
           this.replyTweetContent = ""
           this.showMainReplyModal = false
           // 發送後，關閉光箱 處理完成
          this.isLoading = false
        }catch(error){
          console.log('error',error.message)
          Toast.fire({
              icon: 'error',
              title: '回覆失敗，請稍後再試'
          })
        }
      }
    },
    computed: {
      ...mapState(['currentUser', 'isAuthenticated']),
    },
    // 若光箱開關，則清空資料
    watch:{
        showMainReplyModal(){
            this.replyTweetContent= ""
        }
    },
    filters: {
        fromNow(datetime){
            if(!datetime){
                return '-'
            }
            // 使用moment 提供的fromNow 方法
            return moment(datetime).fromNow()
        }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../assets/style/_variables.scss';
    @import '../assets/style/_reset.scss';
    @import '../assets/style/_base.scss';
    @import '../assets/style/_mixin.scss';

    .icon-button{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 0;
      .img{
        display: block;
        height: 100%;
        width: auto;
      }
    }

    .tweet-wrapper{
      display: grid;
      grid-template-columns: 50px 1fr;
      grid-template-rows: 1fr;
      gap: 10px;
      /* width: 100%;
      height: 100%; */
      padding: 15px;
      background-color: $white;
        .tweet-body{
          display: flex;
          flex-direction: column;
          .tweet-name{
            display: flex;
            align-items: center;
            /* margin-bottom: 3px; */
            .name{
              margin-right: 5px;
              @include font(15px, 1.5, normal, 700);
            }
          .account-name{
            margin-right: 6px;
            color: $dark-grey;
            @include font(15px, 1.5, normal, 500);
            &:before{
                content: '@'
            }
          }
            .update-time{
              position: relative;
              padding-left: 10px;
              color: $dark-grey;
              @include font(15px, 1.5, normal, 500);
              &:before{
                content: '•';
                display: inline-block;
                position: absolute;
                left: -5px;
              }
            }
          }
    .replyPerson{
      display: flex;
      >span{
        margin-right: 5px;
        @include font (15px, 1.5, normal, 500);
        color: $dark-grey;
      }
      .account-name{
        @include font (15px, 1.5, normal, 500);
        color: $primary;
        &:before{
          content: '@',
        }
      }
    }
  }
        .tweet-content{
          margin-bottom: 15px;
          @include font (15px, 1.5, normal, 500);
        }
    }

    // from luca
  .reply-modal{
    height: 345px;
    position: relative;
  }
  .straight-line{
    width: 2px;
    height: 65px;
    background-color: #CCD6DD;
    position: absolute;
    left: 40px;
    top: 90px;
  }
  .your-reply{
    .user-photo-container{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      position: absolute;
      left: 15px;
      top: 163px;
      .user-photo{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    textarea{
      resize: none;
      border: none;
      width: 510px;
      height: 100px;
      font-size: 18px;
      font-weight: 500;
      font-family: Noto Sans TC;
      font-style: normal;
      margin: 0 auto;
      position: absolute;
      left: 75px;
      top: 175px;
    }
    .reply{
      background-color: $primary;
      color: white;
      font-size: 18px;
      font-weight: 500;
      width: 66px;
      height: 38px;
      border-radius: 100px;
      position: absolute;
      right: 15px;
      bottom: 15px;
    }
  }  
</style>