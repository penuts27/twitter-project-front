<template>
    <ul>
        <li>
            <router-link :to="{name: 'user-followers',params: {id: $route.params.id}}">跟隨者</router-link>
        </li>
        <li>
            <router-link :to="{name: 'user-followings',params: {id: $route.params.id}}">正在跟隨</router-link>
        </li>
    </ul>
</template>
<style lang="scss" scoped>
ul{
    display: flex;
    align-items: center;
    background-color: $white;
    border-bottom: 1px solid $border;
    li{
        display: inline-block;
        >a{
            display: inline-block;
            padding: 13px 50px;
            &.active{
            color: $primary;
            border-bottom: 2px solid $primary;
        }
        }
    }
}
</style>