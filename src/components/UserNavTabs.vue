<template>
    <ul>
        <li>
            <router-link :to="{name: 'user-tweets',params: {id: $route.params.id}}">推文</router-link>
        </li>
        <li>
            <router-link :to="{name: 'user-replies',params: {id: $route.params.id}}">推文與回覆</router-link>
        </li>
        <li>
            <router-link :to="{name: 'user-likes',params: {id: $route.params.id}}">喜歡的內容</router-link>
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