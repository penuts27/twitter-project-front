<template>
    <div class="create-tweet">
        <div class="avatar-box">
            <Avatar :initImage="currentUser.avatar" :initUserId="currentUser.id"/>
        </div>
        <div class="say">
            <textarea 
            class="say-content" 
            placeholder="有什麼新鮮事"
            v-model="description"
            @blur="handleBlurTextarea"
            
            ></textarea>
            <div>
                <p class="alert-text" v-show="alertMessage">{{alertMessage}}</p>
                <PublishTweetSolidBtn 
                initText="推文"
                @after-create-tweet="afterCreateTweet"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import Avatar from './Avatar.vue'
    import PublishTweetSolidBtn from './Button/PublishTweetSolidBtn.vue'
    import uuid from 'uuid'
    import { mapState } from 'vuex'

    
    export default {
        components: {
            Avatar,
            PublishTweetSolidBtn
        },
        data(){
            return {
                description: '',
                // avatar: currentUser.avatar
                alertMessage: '',
                isLoading: false
            }
        },
        methods:{
            afterCreateTweet(){
                // 阻擋空白/140字以上發文，並發出警示文字
                if(!this.description.trim()){
                    return this.alertMessage = 'oh!你好像忘記輸入東西了'
                }
                if(this.description.length > 140) {
                    return this.alertMessage = 'oh!你輸入的文字太長了，最多140字'
                }
                this.$emit('after-create-tweet',{
                    id: uuid(),
                    description: this.description
                })
                
                // 清空
                this.description = ""
            },
            // 發文區塊若blur，則取消警示字
            handleBlurTextarea(){
                this.alertMessage = ''
            },
        },
        // 監聽使用者如果重新輸入文字，取消alert文字
        watch:{
            description(newValue){
                if(newValue.trim().length >= 0){
                    this.alertMessage = ''
                }
            }
        },
        computed: {
            ...mapState(['currentUser', 'isAuthenticated'])
        },
    }
</script>

<style lang="scss" scoped>
    .create-tweet{
        display: grid;
        grid-template-columns: 50px 1fr;
        grid-template-rows: 120px;
        gap: 10px;
        padding: 10px 15px;
        margin-bottom: 10px;
        background-color: $white;
        border-bottom: 1px solid $border;
        .avatar-box{
            height: 50px;
        }
        .say{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            .say-content{
                appearance: none;
                flex: 1;
                width: 100%;
                margin-bottom: 10px;
                padding: 10px 0;
                resize: none;
                border: none;
                @include font(18px, 1.4, normal, 500);
                &::placeholder{
                    color: $middle-grey;
                    @include font(18px, 1.4, normal, 500);
                }
            }
            >div{
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .alert-text{
                    margin-right: 10px;
                    color: $warring;
                }
            }
        }
    }
</style>