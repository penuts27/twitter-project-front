<template>
    <div>
        <div :class="['personal-message', {'self': isSelfUser}]" v-if="type === 'chat'">
            <div class="avatar-box">
                <Avatar :initImage="initMessage.avatar" :initUserId="initMessage.userId"/>
            </div>
            <div class="talk-box">
                <div class="talk">
                {{initMessage.content}}
            </div>
            <div class="createdAt">{{initMessage.createdTime | timeFormate}}</div>
            </div>
        </div>
        <h2 class="small" v-else-if="type === 'here'">{{initMessage.person}}{{initMessage.isHere === true ? '已加入' : '已離開'}}</h2>
    </div>
</template>

<script>
import Avatar from '../../components/Avatar.vue'
import moment from 'moment'

export default {
    components: {
        Avatar
    },
    props: {
        isSelfUser:{
            type: Boolean,
            default: false
        },
        initMessage: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            default: 'chat'
        }
    },
    filters:{
        timeFormate(datetime){
            // 若值不存在返回
            if(!datetime) return '-'

            // 若格式不符返回
            if(moment(datetime).isValid === false) return '-'
            // const AMPM = moment(datetime).format('A') === 'AM' ? '上午' : '下午'
            // TODO:AM換成中文
            return moment(datetime).format('A HH:mm')
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/_variables.scss';
@import '../../assets/style/_reset.scss';
@import '../../assets/style/_base.scss';
@import '../../assets/style/_mixin.scss';
.personal-message{
    display: grid;
    grid-template-columns: 40px auto;
    grid-template-rows: auto;
    gap: 10px;
    padding: 10px 15px;
    /* border: 1px solid $border; */
    &.self{
        grid-auto-flow: dense;
        direction: rtl;
        .talk{
        background-color: $primary;
        color: $white;
        border-radius: 500px 500px 0px 500px ;
    }
    }
    .avatar-box{
        height: 60px;
    }
    .talk-box{
        display: flex;
        flex-direction: column;
        max-width: 60%;
        width: fit-content;
    }
    .talk{
        background-color: $border;
        padding: 10px 15px;
        margin-bottom: 5px;
        border-radius: 500px 500px 500px 0px;
        color: $black;
        @include font (15px, 20px, normal, 400);
    }
    .createdAt{
        color: $dark-grey;
        @include font (13px, 1, normal, 400);
    }
}
.small{
    margin: 0 auto;
    width: fit-content;
    padding: 7px 14px;
    background-color: $grey;
    color: $dark-grey;
    border-radius: 500px;
    text-align: center;
    @include font(15px, 1, normal ,500);
}
</style>