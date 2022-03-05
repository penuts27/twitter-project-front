<template>
    <div class="head">
        <i @click="$router.back()">
            <img src="../assets/image/back.svg" alt="">
        </i>
        <div class="userInfo">
            <h2>{{initUser.name}}</h2>
            <h4>{{initUser.tweetCount}}推文</h4>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        initUser: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
 .head{
          display: flex;
          align-items: center;
          background-color: $white;
          padding: 5px 20px;
          >i{
              display: flex;
              align-items: center;
              justify-content: center;
              // 點擊區域
              width: 44px;
              height: 44px;
              cursor: pointer;
          }
          .userInfo{
              display: flex;
              flex-direction: column;
              padding-left: 43px;
              >h2{
                @include font(18px, 1.4, normal, 700);
            }
            >h4{
                color: $dark-grey;
                @include font(13px, 1.2, normal, 500);
            }
          }
      }
</style>