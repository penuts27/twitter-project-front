<template>
    <div class="personalCard">
        <div class="userBackground">
            <figure>
                <img :src="user.cover" alt="封面">
            </figure>
            <div class="avatar-box">
                <Avatar :initImage="user.avatar" :initUserId="user.id"/>
            </div>
        </div>
        <div class="personalInfo">
            <div class="name">{{user.name}}</div>
            <div class="accountName">{{user.account}}</div>
            <div class="description">{{user.introduction}}</div>
            <div class="popularStatus">
                <div>
                    <router-link 
                    :to="{name: 'user-followings', params: {id: $route.params.id}}">{{user.followingCount}}</router-link>
                    <span>個跟隨中</span>
                </div>
                <div>
                    <router-link 
                    :to="{name: 'user-followers', params: {id: $route.params.id}}">{{user.followerCount}}</router-link>
                    <span>位跟隨者</span>
                </div>
            </div>
             <div class="buttonWrapper">
                <SelfEdit
                v-if="user.id === this.currentUser.id"
                @after-change-profile="afterChangeProfile"
                />
                <template v-else>
                    <FollowshipSolidBtn 
                    v-if="user.isFollowed" 
                    @after-click-unfollow="afterClickUnFollow(user.id)"
                    initText="正在跟隨"
                    />
                    <FollowshipOutlineBtn 
                    v-else 
                    initText="跟隨"
                    @after-click-follow="afterClickFollow(user.id)"
                    />
                </template>

            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import Avatar from '../components/Avatar.vue'
import SelfEdit from '../components/SelfEdit.vue'
import FollowshipSolidBtn from '../components/Button/FollowshipSolidBtn.vue'
import FollowshipOutlineBtn from '../components/Button/FollowshipOutlineBtn.vue'
import FollowShipsApi from '../apis/Followships'
import {Toast} from '../utils/helpers'

export default {
    props: {
        initUser: {
            type: Object,
            required: true
        }
    },
    components: {
        Avatar,
        SelfEdit,
        FollowshipSolidBtn,
        FollowshipOutlineBtn
    },
    data(){
        return {
            // watch問題
            user: this.initUser,
            idLoading: false
        }
    },
    methods:{
        afterChangeProfile(profile){
            const{name, introduction, avatar, cover} = profile
            this.user = {
                ...this.user,
                name,
                introduction,
                avatar,
                cover
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
                this.user = {
                    ...this.user,
                    isFollowed: true,
                    followerCount: this.user.followerCount + 1
                }
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
                 this.user = {
                    ...this.user,
                    isFollowed: false,
                    followerCount: this.user.followerCount - 1
                }
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
    
    // 當props值須隨即監控時使用
    watch:{
        initUser(newValue){
            this.user = {
                ...this.user,
                ...newValue
            }
        }
    },
    computed: {
      ...mapState(['currentUser', 'isAuthenticated'])
    },
}
</script>

<style lang="scss" scoped>
.personalCard{
    width: 100%;
    .userBackground{
        position: relative;
        width: 100%;
        height: 200px;
        background-color: $white;
        >figure{
            width: 100%;
            height: 100%;
            overflow: hidden;
            >img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .avatar-box{
            position: absolute;
            top: 100%;
            left: 15px;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background-color: $white;
            padding: 3px;
            z-index: 1;
        }
    }
    .personalInfo{
        position: relative;
        padding: 75px 15px 20px;
        background-color: $white;
        .name{
            @include font(19px,1.5,normal,900);
        }
        .accountName{
            margin-bottom: 10px;
            color: $dark-grey;
            @include font(15px, 1.5, normal, 500);
            &:before{
                content: '@'
            }
        }
        .description{
            margin-bottom: 10px;
            @include font(14px, 1.5, normal, 500);
        }
        .popularStatus{
            display: flex;
            >div{
                margin-right: 20px;
                @include font(14px,1.2,normal,500);
                >span{
                    color: $dark-grey;
                    margin-left: 3px;
                }
            }
        }
        .buttonWrapper{
            position: absolute;
            top: 20px;
            right: 15px;
        }
    }
}
</style>