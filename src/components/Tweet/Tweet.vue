<template>
    <router-link :to="{name: 'tweet', params: {id: tweet.id}}" class="tweet-wrapper">
        <div class="avatar-box">
            <Avatar :init-image="tweet.image" :initUserId="tweet.userId"/>
        </div>
        <div class="tweet-body">
            <div class="tweet-name">
                <div class="name">{{tweet.name}}</div>
                <div class="account-name">{{tweet.accountName}}</div>
                <div class="update-time">{{tweet.createdAt | fromNow }}</div>
            </div>
            <div class="replyPerson" v-show="initTweet.replyPerson">
                <span>回覆</span>
                <div class="account-name">{{tweet.replyPerson}}</div>
            </div>
            <div class="tweet-content">{{tweet.description}}</div>
            <div class="reaction" v-show="initLikesAndReplies">
                <a href="#" class="comments">
                    <i><MainReplyModal 
                    :initTweet="tweet"
                    @after-reply-tweet="afterReplyTweet"
                    /></i>
                    <p>{{tweet.replyCount}}</p>
                </a>
                <a href="#" class="favorite">
                    <i 
                    v-if="!tweet.isLiked"
                    @click.stop.prevent="handleAddLike(tweet.id)"
                    ><img src="../../assets/image/favorite.svg" alt="尚未加入最愛"></i>
                    <i 
                    v-else
                    @click.stop.prevent="handleUnLike(tweet.id)"
                    ><img src="../../assets/image/favorite-active.svg" alt="加入最愛中"></i>
                    <p>{{tweet.likeCount}}</p>
                </a>
            </div>
        </div>
    </router-link>
</template>
<script>
import Avatar from '../Avatar.vue'
import moment from 'moment'
import tweetApis from '../../apis/tweet'
import { Toast } from '../../utils/helpers.js'
import MainReplyModal from '../MainReplyModal.vue'
// import {Like} from '../../utils/mixins'


export default {
    components: {
        Avatar,
        MainReplyModal
    },
    props:{
        initTweet: {
            type: Object,
            required: true
        },
        initLikesAndReplies: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            tweet: {
                id: -1,
                userId: -1,
                name: '',
                accountName: '',
                image: '',
                description: '',
                createdAt: '',
                isLiked: false,
                likeCount: -1,
                replyCount: -1,
                // 暫時
                replyPerson: ''
            },
            tweetLikes: [],
            tweetComments: [],
            isLoading: false
        }
    },
    methods: {
        fetchTweetDate(){
            const {
                id, 
                UserId: userId,       
                description, 
                createdAt,
                likeCount,
                replyCount,
                // 暫時,
                replyPerson,
                isLiked,
                User
            } = this.initTweet
            const {
                name,
                account: accountName,
                avatar: image
            } = User
            this.tweet = {
                ...this.tweet,
                id,
                userId, 
                name, 
                accountName, 
                image, 
                description, 
                createdAt,
                likeCount,
                replyCount,
                isLiked,
                replyPerson
            }
        },
        afterReplyTweet(){
            this.tweet = {
                ...this.tweet,
                replyCount: this.tweet.replyCount + 1
            }
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
                    isLiked: true
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
                    isLiked: false
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
        this.fetchTweetDate()
    },
    watch: {
        initTweet(newValue){
            this.tweet ={
                ...this.tweet,
                ...newValue
            }
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
    },
    // mixins: [Like]
}
</script>
<style lang="scss" scoped>
    @import '../../assets/style/_variables.scss';
    @import '../../assets/style/_reset.scss';
    @import '../../assets/style/_base.scss';
    @import '../../assets/style/_mixin.scss';
    .tweet-wrapper{
        display: grid;
        grid-template-columns: 50px 1fr;
        grid-template-rows: 1fr;
        gap: 10px;
        padding: 15px;
        background-color: $white;
        border-bottom: 1px solid $border;
        .avatar-box{
            height: 50px;
        }
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
        .reaction{
            display: flex;
            .comments{
                display: flex;
                align-items: center;
                margin-right: 50px;
                >p{
                    color: $dark-grey;
                    @include font (13px, 1, normal, 500);
                }
                >i{
                    width: 13px;
                    height: 13px;
                    margin-right: 10px;
                }
            }
            .favorite{
                display: flex;
                align-items: center;
                >p{
                    color: $dark-grey;
                    @include font (13px, 1, normal, 500);
                }
                i{
                    margin-right: 10px;
                }
            }
        }
    }
</style>