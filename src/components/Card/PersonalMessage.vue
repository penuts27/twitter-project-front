<template>
    <div :class="['personal-message', {'self': isSelfUser}]">
        <div class="avatar-box">
            <Avatar :initImage="initMessage.avatar" :initUserId="initMessage.userId"/>
        </div>
        <div class="talk-box">
            <div class="talk">
            {{initMessage.content}}
        </div>
        <div class="createdAt">{{initMessage.createdAt}}</div>
        </div>
    </div>
</template>

<script>
import Avatar from '../../components/Avatar.vue'
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
            require: true
        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>