<template>
    <div class="wrapper">
        <slot/>
        <div class="chat-room scrollbar" ref="chatroom" >
            <div class="chat-content">
                <!-- <h2 v-for="(mes, index) in messages" :key="index">{{mes}}</h2> -->
                <PersonalMessage 
                v-for="(message, index) in messages" 
                :key="index"
                :initMessage="message"
                :isSelfUser="currentUser.id === message.userId"
                />
                <!-- :type="message.type" -->
            </div>
        </div>
        <div class="chat-input-box">
                <input type="text" v-model="text" class="chat-input" placeholder="輸入訊息...">
                <i 
                @click.stop.prevent="handleSend"
                >
                    <img src="../assets/image/arrow.svg" alt="">
                </i>
            </div>
    </div>
</template>
<script>
import PersonalMessage from '../components/Card/PersonalMessage.vue'
import {mapState} from 'vuex'

const dummyData2 = [
{
    type: 'here',
    isHere: true,
    userId: 274,
    avatar: 'https://gravatar.com/avatar/7171d4a3173dbc64468bbb0ac241ec8d?s=400&d=robohash&r=x',
    name: 'robot1',
    account: 'robot1'
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
    type: 'here',
    isHere: false,
    avatar: 'https://gravatar.com/avatar/7171d4a3173dbc64468bbb0ac241ec8d?s=400&d=robohash&r=x',
    name: 'robot1',
    account: 'robot1'
},
{
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
    props: {
      initMessages: {
          type: Array,
          default: () => {
              return []
          }
      },
      initSocket: {
          type: Object,
          required: false
      }
    },
    data(){
        return {
            messages: [],
            text: '',
        }
    },
    methods: {
        handleSend(){
            if(!this.initSocket) return
            if (this.text.trim()) {
                // 通道名稱為chat message
                this.initSocket.emit('chat message', {
                    msg: this.text,
                    userId: this.currentUser.id,

                })
                this.text= ""
                // {
                //     msg: this.text,
                //     userId: currentUser.id
                // }
            }
        },
        fetchData(){
            this.messages = dummyData2
        }
    },
    created(){
        // this.fetchData()
    },
    // 當props值須隨即監控時使用
    watch:{
        initMessages(newValue){
            this.messages = {
                ...this.messages,
                ...newValue
            }
            // $nextTick會再dom掛載，渲染之後執行function
            this.$nextTick(function(){
                const roomContainer = this.$refs.chatroom
                roomContainer.scrollTop = roomContainer.scrollHeight
            })
        }
    },
    mounted(){
        window.addEventListener('keyup', event => {
            if(event.keyCode === 13){
                this.handleSend()
            }
        })
        // // 進入聊天室時，會收到之前的全部訊息，並更新到 messages
        // this.socket.on('all messages', data => {
        //     this.messages = data
        // })
        
        // 設定接收到新訊息的監聽器
    },
    computed: {
        ...mapState(['currentUser']),
    }
    
}
</script>
<style lang="scss" scoped>
    .wrapper{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto;
        /* display: flex;
        flex-direction: column; */
        border: 1px solid $border;
        height: 100vh;
    }
    .chat-room{
        /* flex: 1; */
        display: flex;
        flex-direction: column;
        // 減去head高度
        height: 100%;
        overflow-y: scroll;
        .chat-content{
            flex: 1;
        }
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
    h2.title{
    padding: 24px;
    border-bottom: 1px solid $border;
    @include font(24px, 1, normal, 700);
    }
    .scrollbar {
        // 拉回距離
        padding-left: 6px;
        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background-color: rgba(104, 104, 104, 0.1);
        }
        }
</style>