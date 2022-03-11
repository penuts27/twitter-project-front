<template>
    <div class="popular-list">
        <h2>Popular</h2>
        <ul class="list">
            <li class="popular-card" v-for="user in users" :key="user.id">
                <Avatar 
                :initImage="user.image"
                :initUserId="user.id"
                />
                <div class="popular-name">
                    <div class="name">{{user.name}}</div>
                    <div class="account-name">{{user.accountName}}</div>
                </div>
                <FollowshipOutlineBtn 
                initText="追隨" 
                @after-click-follow="afterClickFollow(user.id)"
                v-if="!user.isFollowed"
                />
                <FollowshipSolidBtn
                @after-click-unfollow="afterClickUnFollow(user.id)"
                initText="正在跟隨" 
                v-else
                />
            </li>
        </ul>
    </div>
</template>

<script>
import FollowshipOutlineBtn from './Button/FollowshipOutlineBtn.vue'
import FollowshipSolidBtn from './Button/FollowshipSolidBtn.vue'
import Avatar from './Avatar.vue'
import userApi from '../apis/user'
// import {FollowshipMethods} from '../utils/mixins'
import FollowShipsApi from '../apis/Followships'
import { Toast } from '../utils/helpers.js'
import { mapState } from 'vuex'

export default {
    components: {
        FollowshipOutlineBtn,
        Avatar,
        FollowshipSolidBtn
    },
    data(){
        return {
            users: [],
            isLoading: false
        }
    },
    methods:{
        async fetchUsers(){
            try{
                const {data, statusText} = await userApi.getUsersTop()

                
                // console.log('@@', data)

                if(statusText !== 'OK'){
                    throw new Error(statusText)
                }
                this.users = data.map(user => ({
                    id: user.id,
                    name: user.name,
                    accountName: user.account,
                    image: user.avatar,
                    isFollowed: user.isFollowed
                })).filter(user => user.id !== this.currentUser.id)
                // 排除自己，自己不能追蹤自己
            }catch(error){
                console.log('error', error.message)
                Toast.fire({
                    icon: 'error',
                    title: '載入人氣使用者失敗，請稍後再試'
                })
            }
        },
        async afterClickFollow(userId){
            // 若loading則返回
            if(this.isLoading === true) return
            try{
                // 發送api前改為等待中
                this.isLoading = true
                const {statusText} = await FollowShipsApi.followUser({userId})
                if(statusText !== 'OK'){
                    throw new Error(statusText)
                }
                // 這裡為users
                this.users = this.users.map(user => {
                    if(user.id === userId){
                        return {
                            ...user,
                            isFollowed: !user.isFollowed
                        }
                    }else{
                        return user
                    }
                })
                // 發送api並更改完狀態後，改成不再等待模式
                this.isLoading = false
            }catch(error){
                console.log('error', error.message)
                Toast.fire({
                    icon: 'error',
                    title: '追蹤使用者失敗，請稍後再試'
                })
                // 發送api並更改完狀態後，改成不再等待模式
                this.isLoading = false
            }
        },
        async afterClickUnFollow(userId){
             // 若loading則返回
            if(this.isLoading === true) return
            try{
                 // 發送api前改為等待中
                this.isLoading = true
                const {statusText} = await FollowShipsApi.unFollowUser({userId})
                if(statusText !== 'OK'){
                    throw new Error(statusText)
                }
                this.users = this.users.map(user => {
                    if(user.id === userId){
                        return {
                            ...user,
                            isFollowed: !user.isFollowed
                        }
                    }else{
                        return user
                    }
                })
                // 發送api並更改完狀態後，改成不再等待模式
                this.isLoading = false
            }catch(error){
                console.log('error', error.message)
                Toast.fire({
                    icon: 'error',
                    title: '追蹤使用者失敗，請稍後再試'
                })
                // 發送api並更改完狀態後，改成不再等待模式
                this.isLoading = false
            }
        },
    },
    created(){
        this.fetchUsers()
    },
    computed: {
        ...mapState(['currentUser'])
    }
}
</script>
<style lang="scss" scoped>
    @import '../assets/style/_variables.scss';
    @import '../assets/style/_reset.scss';
    @import '../assets/style/_base.scss';
    @import '../assets/style/_mixin.scss';
    
    .popular-list{
        background-color: $light-grey;
        border-radius: 14px;
        .popular-card{
            display: grid;
            grid-template-columns: 50px 1fr auto;
            grid-template-rows: 70px;
            gap: 10px;
            align-items: center;
            padding: 10px 15px;
            border-top: 1px solid $border;
        }
        .popular-name{
            .name{
                margin-bottom: 3px;
                @include font(15px, 1, normal, 700);
            }
            .account-name{
                color: $dark-grey;
                @include font(15px, 1, normal, 700);
                &:before{
                    content: '@';
                }
            }
        }
                   
        >h2{
            /* border-bottom: 1px solid border; */
            padding: 0 15px;
            border-bottom: 1px solid $border;
            @include font(18px, 45px, normal, 700);
        }
    }
</style>