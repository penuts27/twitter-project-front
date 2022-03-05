<template>
    <div class="chat-room">
        <div class="chat-content">
            <div class="personal-message">
                <div class="avatar-box">
                    <Avatar/>
                </div>
                <div class="talk-box">
                    <div class="talk">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo eaque 
                </div>
                <div class="createdAt">下午6:08</div>
                </div>
            </div>
            <div class="personal-message right">
                <div class="avatar-box">
                    <Avatar/>
                </div>
                <div class="talk-box">
                    <div class="talk">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo eaque 
                </div>
                <div class="createdAt">下午6:08</div>
                </div>
            </div>
        </div>
        <div class="chat-input-box">
            <input type="text" class="chat-input" placeholder="輸入訊息...">
            <i></i>
        </div>
    </div>
</template>
<script>
import Avatar from '../components/Avatar.vue'
export default {
    components: {
        Avatar
    }
}
</script>
<style lang="scss" scoped>
    .chat-room{
        display: flex;
        flex-direction: column;
        height: 100%;
        .chat-content{
            flex: 1;
            .personal-message{
                display: grid;
                grid-template-columns: 40px auto;
                grid-template-rows: auto;
                gap: 10px;
                padding: 10px 15px;
                /* border: 1px solid $border; */
                &.right{
                    grid-auto-flow: dense;
                    direction: rtl;
                }
                .avatar-box{
                    height: 60px;
                }
                .talk-box{
                    display: flex;
                    flex-direction: column;
                    max-width: 60%;
                }
                .talk{
                    background-color: $border;
                    padding: 10px 15px;
                    margin-bottom: 5px;
                    border-radius: 500px;
                    color: $black;
                    @include font (15px, 20px, normal, 400);
                }
                .createdAt{
                    @include font (13px, 1, normal, 400);
                }
            }
        }
        .chat-input-box{
            flex: 0 0 auto;
            border-top: 1px solid $border;
            padding: 16px;
            .chat-input{
                appearance: none;
                padding: 1px 15px;
                background-color: $border;
                border-style: none;
                border-radius: 500px;
                @include font(16px, 26px ,normal, 400);
                &::placeholder{
                    color: $middle-grey;
                }
            }
        }
    }
</style>