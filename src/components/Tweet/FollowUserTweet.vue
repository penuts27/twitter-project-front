<template>
    <div class="tweet-wrapper">
        <Avatar :init-image="tweet.image" :initUserId="tweet.userId"/>
        <div class="tweet-body">
            <div class="name">{{tweet.name}}</div>
            <div class="account-name">{{tweet.accountName}}</div>
            <div class="tweet-introduce">{{tweet.introduction}}</div>
            <div :class="['buttonWrapper', {'transparent': isMe}]">
                <FollowshipOutlineBtn 
                initText="跟隨" 
                init-size="sm" 
                v-if="!tweet.isFollowed"
                @after-click-follow="afterClickFollow(tweet.userId)"
                />
                <FollowshipSolidBtn 
                initText="正在跟隨" 
                init-size="sm" 
                v-else
                @after-click-unfollow="afterClickUnFollow(tweet.userId)"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from '../Avatar.vue'
import moment from 'moment'
import tweetApis from '../../apis/tweet'
import { Toast } from '../../utils/helpers.js'
import FollowshipSolidBtn from '../Button/FollowshipSolidBtn.vue'
import FollowshipOutlineBtn from '../Button/FollowshipOutlineBtn.vue'
import FollowShipsApi from '../../apis/Followships'
import { mapState } from 'vuex'

export default {
    components: {
        Avatar,
        FollowshipSolidBtn,
        FollowshipOutlineBtn
    },
    props:{
        initTweet: {
            type: Object,
            required: true
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
                isFollowed: false
            },
            tweetLikes: [],
            tweetComments: [],
        }
        // initTweet
        // User:{
        //     account:"user1"
        //     avatar:"https://loremflickr.com/320/320/people"
        //     id:2
        //     introduction:"Qui repellendus repellat laudantium minus aut.\nVeniam ea libero labore natus qui qui quisquam totam.\nA quasi eligendi commodi rerum."
        //     name:"Chester Windler"
        // }
        // UserId:2
        // createdAt:"2022-02-27T18:09:19.000Z"
        // id:8
        // userId:2
        // isFollowed:true
    },
    methods: {
        fetchTweetDate(){
            const {
                id, 
                UserId: userId,       
                createdAt,
                isFollowed,
                User
            } = this.initTweet
            const {
                name,
                account: accountName,
                avatar: image,
                introduction
            } = User
            this.tweet = {
                ...this.tweet,
                id,
                userId, 
                name, 
                accountName, 
                image, 
                introduction, 
                createdAt,
                isFollowed
            }
        },
        async handleAddLike(tweetId){
            try{
                const {statusText} = await tweetApis.addLike({tweetId})
                // console.log(response)
                if(statusText !== 'OK'){
                    throw new Error(statusText)
                }
                this.tweet = {
                    ...this.tweet,
                    isLike: true
                }
            }catch(error){
                console.log('error',error.message)
                Toast.fire({
                    icon: 'error',
                    title: '加到喜歡失敗，請稍後再試'
                })
            }
        },
        async afterClickFollow(userId){
            try{
                const {statusText} = await FollowShipsApi.followUser({userId})
                if(statusText !== 'OK'){
                    throw new Error(statusText)
                }
                this.tweet = {
                    ...this.tweet,
                    isFollowed: true
                }
            }catch(error){
                console.log('error', error.message)
                Toast.fire({
                    icon: 'error',
                    title: '追蹤使用者失敗，請稍後再試'
                })
            }
        },
        async afterClickUnFollow(userId){
            try{
                const {statusText} = await FollowShipsApi.unFollowUser({userId})
                if(statusText !== 'OK'){
                    throw new Error(statusText)
                }
                this.tweet = {
                    ...this.tweet,
                    isFollowed: false
                }
            }catch(error){
                console.log('error', error.message)
                Toast.fire({
                    icon: 'error',
                    title: '追蹤使用者失敗，請稍後再試'
                })
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
     computed: {
        ...mapState(['currentUser']),
        isMe(){
            return this.tweet.userId === this.currentUser.id
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../assets/style/_variables.scss';
    @import '../../assets/style/_reset.scss';
    @import '../../assets/style/_base.scss';
    @import '../../assets/style/_mixin.scss';

    .tweet-wrapper{
        position: relative;
        display: grid;
        grid-template-columns: 50px 1fr;
        grid-template-rows: 1fr;
        gap: 10px;
        padding: 15px;
        background-color: $white;
        border-bottom: 1px solid $border;
        .tweet-body{
            display: flex;
            flex-direction: column;
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
        }
        .tweet-introduce{
            margin-bottom: 15px;
            @include font (15px, 1.5, normal, 500);
        }
        .buttonWrapper{
            position: absolute;
            top: 10px;
            right: 10px;
            &.transparent{
                opacity: 0;
            }
        }
    }
</style>