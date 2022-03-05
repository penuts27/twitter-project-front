<template>
    <router-link class="avatar" :to="{name: 'user-tweets', params: {id: initUserId}}">
        <figure>
            <img :src="initImage" alt="大頭貼">
        </figure>
    </router-link>
</template>

<script>
export default {
    props: {
        initImage:{
            type: String,
            default: 'https://fakeimg.pl/300/'
        },
        initUserId:{
            type: Number,
            // 暫時如此
            required: true
        }
    },
}
</script>

<style lang="scss" scoped>
.avatar{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
// 該組件永遠為圓形，寬度為父層寬度
figure{
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    border-radius: 100%;
    overflow: hidden;
    >img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        @include poaCenter;
    }
}
</style>