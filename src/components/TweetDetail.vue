<template>
    <div class="tweet-detail">
        <div class="detail-user">
            <div class="avatar-wrapper">
                <Avatar :initUserId="tweet.UserId" :initImage="tweet.User.avatar"/>
            </div>
            <div class="detail-name">
                <div class="name">{{tweet.User.name}}</div>
                <div class="account-name">{{tweet.User.account}}</div>
            </div>
         </div>
        <div class="tweet-content">{{tweet.description}}</div>
        <div class="detail-time">
            <div class="time">{{tweet.createdAt | timeFormate}}</div>
            <!-- <div class="date"></div> -->
        </div>
        <div class="reactions">
            <div class="reaction">
                <a href="#">{{tweet.likeCount}}</a>
                <span>喜歡次數</span>
            </div>
            <div class="reaction">
                <a href="#">{{tweet.replyCount}}</a>
                <span>回覆</span>
            </div>
        </div>
        <div class="icon-group">
            <a href="#" >
                <MainReplyModal
                :initTweet="modelData"
                @after-reply-tweet="afterReplyTweet"
                />
                </a>
            <a href="#" class="favorite">
                <i 
                v-if="!tweet.isLike"
                @click.stop.prevent="handleAddLike(tweet.id)"
                ><img src="../assets/image/favorite.svg" alt="尚未加入最愛"></i>
                <i 
                v-else
                @click.stop.prevent="handleUnLike(tweet.id)"
                ><img src="../assets/image/favorite-active.svg" alt="加入最愛中"></i>
            </a>
        </div>
    </div>
</template>
<script>
import Avatar from '../components/Avatar.vue'
import tweetApis from '../apis/tweet'
import { Toast } from '../utils/helpers'
import moment from 'moment'
import MainReplyModal from '../components/MainReplyModal.vue'
// import {Like} from '../utils/mixins'

export default {
    name: 'tweetDetail',
    components: {
        Avatar,
        MainReplyModal
    },
    data(){
        return {
            tweet: {},
            modelData: {
                accountName: '',
                createdAt: '',
                description: '',
                id: -1,
                image: '',
                isLiked: false,
                likeCount: 0,
                name: '',
                replyCount: 0,
                userId: -1
            },
            isLoading: false
        }
    },
    methods:{
        async fetchTweetDetail(tweetId){
            try{
                const {data, statusText} = await tweetApis.getTweet({tweetId})
                // console.log('&&&',data)
                //  User:
                        // account: "root"
                        // avatar: "https://loremflickr.com/320/320/people"
                        // id: 7
                        // name: "root"
                // UserId: 7
                // createdAt: "2022-02-27T17:09:03.000Z"
                // description: "Cumque omnis qui aut cum vel. Consequatur debitis nihi"
                // id: 75
                // updatedAt: "2022-02-27T17:09:03.000Z"
                if(statusText !== 'OK'){
                    throw new Error(statusText)
                }
                this.tweet = data
                const {createdAt, description, id, isLike, likeCount, replyCount, UserId, User} = data
                const {account, name, avatar} = User
                this.modelData = {
                    accountName: account,
                    createdAt,
                    description,
                    id,
                    image: avatar,
                    isLike,
                    likeCount,
                    name,
                    replyCount,
                    userId: UserId
                }
               

            }catch(error){
                console.log('error', error.message)
                Toast.fire({
                    icon: 'error',
                    title: '獲取貼文資料失敗，請稍後再試'
                })
            }
        },
        afterReplyTweet(payload){
            // console.log('payload',payload)
            this.$emit('after-reply-tweet', payload)
        },
        async handleAddLike(tweetId){
            // 若還在處理中則不受理
            if(this.isLoading === true) return
            try{
                // call api 前改狀態為處理中
                this.isLoading = true 

                const {statusText} = await tweetApis.addLike({tweetId})
                if(statusText !== 'OK'){
                    throw new Error(statusText)
                }
                this.tweet = {
                    ...this.tweet,
                    likeCount: this.tweet.likeCount + 1,
                    isLike: true
                }
                // call api 後並且畫面改變 狀態為處理完成
                this.isLoading = false 
            }catch(error){
                console.log('error',error.message)
                Toast.fire({
                    icon: 'error',
                    title: '加到喜歡失敗，請稍後再試'
                })
                // call api 失敗後 狀態為處理完成
                this.isLoading = false 
            }
        },
        async handleUnLike(tweetId){
            // 若還在處理中則不受理
            if(this.isLoading === true) return
            try{
                // call api 前改狀態為處理中
                this.isLoading = true 
                const {statusText} = await tweetApis.unLike({tweetId})
                if(statusText !== 'OK'){
                    throw new Error(statusText)
                }
                this.tweet = {
                    ...this.tweet,
                    likeCount: this.tweet.likeCount - 1,
                    isLike: false
                }
                // call api 後並且畫面改變 狀態為處理完成
                this.isLoading = false 
            }catch(error){
                console.log('error',error.message)
                Toast.fire({
                    icon: 'error',
                    title: '收回喜歡失敗，請稍後再試'
                })
                // call api 失敗後 狀態為處理完成
                this.isLoading = false 
            }
        },
    },
    created(){
        const id = this.$route.params.id
        this.fetchTweetDetail(id)
    },
    filters:{
        timeFormate(datetime){
            // 若值不存在返回
            if(!datetime) return '-'

            // 若格式不符返回
            if(moment(datetime).isValid === false) return '-'
            // const AMPM = moment(datetime).format('A') === 'AM' ? '上午' : '下午'
            // TODO:AM換成中文
            return moment(datetime).format('A HH:mm•YYYY年MM月DD日')
        }
    },
    // mixins: [Like]
}
</script>
<style lang="scss" scoped>
    .tweet-detail{
        background-color: $white;
        border: 1px solid $border;
        padding: 15px 15px 10px 15px;
        .detail-user{
            display: flex;
            margin-bottom: 15px;
            .detail-name{
                .name{
                    @include font(15px, 1.5, normal, 700);
                }
                .account-name{
                    color: $dark-grey;
                    @include font(15px, 1.5, normal, 500);
                    &:before{
                        content: '@'
                    }
                }
            }
        }
        .tweet-content{
            flex-shrink: 0;
            max-width: 510px;
            margin-bottom: 15px;
            @include font(23px, 34px ,normal, 500);
        }
        .detail-time{
            .time{
                padding-bottom: 15px;
                color: $dark-grey;
                border-bottom: 1px solid $border;
                @include font(15px, 21.72px, normal, 500);
            }
        }
        .reactions{
            display: flex;
            align-items: center;
            border-bottom: 1px solid $border;
            .reaction{
                margin-right: 20px;
                padding-top: 20px;
                padding-bottom: 20px;
                >a{
                    display: inline-block;
                    margin-right: 3px;
                    @include font(19px, 27.51px, normal, 700);
                }
                >span{
                    display: inline-block;
                    @include font(19px, 27.51px, normal, 500);
                }
            }
        }
        .icon-group{
            display: flex;
            align-items: center;
            margin-top: 10px;
            >a{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 25px;
            height: 25px;
            >i{
                width: 100%;
                height: 100%;
                >img{
                    width: 100%;
                    height: 100%;
                }
            }
            &:not(:last-child){
                margin-right: 155px;
            }
            >img{
                width: 25px;
            }
            
        }
        }
    }
    .avatar-wrapper{
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }
</style>