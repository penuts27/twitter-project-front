<template>
    <div class="chat-room">
        <div class="chat-content">
            <PersonalMessage 
            v-for="message in messages" 
            :key="message.id"
            :initMessage="message"
            :isSelfUser="currentUser.id === message.userId"
            />
            <h2>其他訊息</h2>
            <!-- <PersonalMessage :isSelfUser="true"/> -->
        </div>
        <div class="chat-input-box">
            <input type="text" v-model="text" class="chat-input" placeholder="輸入訊息...">
            <i @click.stop.prevent="handleSend"><img src="../assets/image/arrow.svg" alt=""></i>
        </div>
    </div>
</template>
<script>
import PersonalMessage from '../components/Card/PersonalMessage.vue'
import {mapState} from 'vuex'

const dummyData = [
{
    type: 'enter',
    person: 'will'
},
{
    type: 'chat',
    avatar: 'https://gravatar.com/avatar/7171d4a3173dbc64468bbb0ac241ec8d?s=400&d=robohash&r=x',
    name: 'robot1',
    userId: 273,
    id:1,
    content: '你好啊',
    createdAt: '下午9:39',
},{
    type: 'chat',
    avatar: 'https://gravatar.com/avatar/8e92f23f6d7f67cb0e00edfbba39d02f?s=400&d=robohash&r=x',
    name: 'robot2',
    userId: 274,
    id: 2,
    content: '我不好',
    createdAt: '下午9:40',
},
{
    type: 'chat',
    avatar: 'https://gravatar.com/avatar/78470cf2ae4b1d25cbda7950389b06d2?s=400&d=robohash&r=x',
    name: 'robot1',
    userId: 275,
    id:3,
    content: '安安',
    createdAt: '下午9:41',
}]

export default {
    components: {
        PersonalMessage
    },
    data(){
        return {
            messages: [],
            text: ''
        }
    },
    methods: {
        handleSend(){
            if (this.text.trim()) {
                // 通道名稱為chat message
                this.$socket.emit('chat message', {
                    msg: this.text
                })
                this.text= ""
            }
        },
        fetchData(){
            this.messages = dummyData
        }
    },
    created(){
        this.fetchData()
    },
    computed: {
        ...mapState(['currentUser']),
        // isMe(){
        //     return this.currentUser.id === 
        // }
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
        }
        .chat-input-box{
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            border-top: 1px solid $border;
            padding: 16px;
            .chat-input{
                appearance: none;
                flex: 1;
                padding: 1px 15px;
                background-color: $border;
                border-style: none;
                border-radius: 500px;
                @include font(16px, 26px ,normal, 400);
                &::placeholder{
                    color: $middle-grey;
                }
            }
            >i{
                flex: 0 0 auto;
                padding-left: 18px;
                padding-right: 5px;
                cursor: pointer;
            }
        }
    }
</style>