<template>
    <div class="noTweet">
        <h2>{{initText}}</h2>
    </div>
</template>
<script>
export default {
    props:{
        initText: {
            type: String,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/style/_variables.scss';
    @import '../../assets/style/_reset.scss';
    @import '../../assets/style/_base.scss';
    @import '../../assets/style/_mixin.scss';
    .noTweet{
        width: 100%;
        height: 100%;
        background-color: $border;
        >h2{
            padding: 50px;
            color: grey;
            @include font(20px, 1.4, normal, 700);
            text-align: center;
        }
    }
</style>