<template>
    <div class="wrapper">
        <Header :initUser="user"/>
        <FollowNavTabs/>
        <NoTweet
         v-if="!tweets.length"
         initText="該用戶目前沒有任何追蹤~"
         />
        <FollowUserTweet 
        v-else
        v-for="tweet in tweets" 
        :key="tweet.id" 
        :initTweet="tweet"/>
    </div>
</template>

<script>
import FollowUserTweet from '../Tweet/FollowUserTweet.vue'
import FollowNavTabs from '../FollowNavTabs.vue'
import UsersApi from '../../apis/user'
import { Toast } from '../../utils/helpers'
import { mapState } from 'vuex'
import NoTweet from '../Tweet/NoTweet.vue'
import Header from '../Header.vue'

export default {
    name: 'FollowingConetent',
    components: {
        FollowUserTweet,
        FollowNavTabs,
        NoTweet,
        Header
    },
    data(){
        return {
            tweets: [],
            user: {
                name: '',
                tweetCount: 0
            }
        }
    },
    methods: {
        async fetchTweets(userId){
            try{
                // 取得tweet資料
               const {data, statusText} = await UsersApi.getUserFollowings({userId})
            //    console.log('@@@@@',data)
               if(statusText !== 'OK'){
                   throw new Error(statusText)
               }
               this.tweets = data.map(tweet => {
                   return {
                        id: tweet.id, 
                        UserId: tweet.following.id, 
                        createdAt: tweet.createdAt,
                        userId: tweet.following.id,
                        isFollowed: tweet.isFollowed,
                        User: {
                            id: tweet.following.id,
                            name: tweet.following.name,
                            account: tweet.following.account,
                            avatar: tweet.following.avatar,
                            introduction: tweet.following.introduction
                        },
                   }
               })
            }catch(error){
                console.log('error',error.message)
                Toast.fire({
                    icon: 'error',
                    title: '未能取得使用者推文，請稍後再試'
                })
            }
        },
        async fetchUser(userId){
            try{
                const {data, statusText} = await UsersApi.getUser({userId})
                // console.log('$$',data)
                const {
                    name,
                    tweetCount,
                } = data
                if(statusText !== 'OK'){
                    throw new Error(statusText)
                }
                this.user= {
                    ...this.user,
                    name,
                    tweetCount,
                }

            }catch(error){
                console.log('error',error)
                Toast.fire({
                    icon: 'error',
                    title: '取得使用者資料失敗，請稍後再試'
                })
            }
        },
    },
    created(){
        const id = this.$route.params.id
        this.fetchTweets(id)
        this.fetchUser(id)
    },
    computed: {
        ...mapState(['currentUser'])
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    height: 100%;
}
</style>