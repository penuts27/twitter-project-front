<template>
  <button class="outlineBtn" @click="showEditModal=true">
    編輯個人資料
    <Modal class="light-box " v-model="showEditModal" title="編輯個人資料">
      <div class="edit-board">
        <form action=""  @submit.prevent.stop="emitEdit">
            <button type="submit" class="save-edit-profile" :disabled="isProcessing">
              儲存
            </button>
            <div class="edit-cover">
              <div class="cover-container">
                <img v-if="this.coverImage" :src="this.coverImage" alt="">
                <img v-else :src="currentUser.cover" alt="">
              </div>
              <label class="select-cover" for="cover" >
                <img src="../assets/image/icon_uploadPhoto.svg" alt="">
              </label>
              <input id="cover" type="file" name="cover" accept="image/*" @change="handleCoverChange">
              <button class="delete-cover"  type="button" @click="deleteCover">
                <img src="../assets/image/icon_delete.svg" alt="">
              </button>
            </div>
            <div class="edit-personal-photo">
              <div class="personal-photo-container">
                <img v-if="this.avatarImage" class="photo" :src="this.avatarImage" alt="">
                <img v-else class="photo" :src="currentUser.avatar" alt="">
              <label class="upload-avatar" for="avatar">
                <img src="../assets/image/icon_uploadPhoto.svg" alt="">
              </label>
              <input id="avatar" type="file" name="avatar" accept="image/*" @change="handleAvatarChange">
              </div>
            </div>
            <div class="edit-personal-info">
              <div class="input-box name">
                <label for="name">名稱</label>
                <input
                  id="name"
                  v-model="name"
                  name="name"
                  type="name"
                  class="form-control"
                  autocomplete="username"
                  required
                  autofocus
                >
                <p class="alert-text" v-show="alertMessage">{{ alertMessage }}</p>
                <p class="name-count">{{this.name.length}}/50</p>
              </div>
              <div class="input-box introduction">
                <label for="introduction">自我介紹</label>
                <textarea 
                  name="introduction" 
                  id="introduction" 
                  v-model="introduction" 
                  required 
                  autofocus
                >
                </textarea>
                <p class="alert-text" v-show="alertMessage">{{ alertMessage }}</p>
                <p class="introduction-count" >{{this.introduction.length}}/160</p>
              </div>
            </div>
        </form>
      </div>
    </Modal>
  </button>

</template>


<script>
import { mapState } from 'vuex'
import userAPI from './../apis/user'
import { Toast } from './../utils/helpers'


  export default {
    data(){
      return{
        showEditModal: false,
        isProcessing: false,
        name:"",
        introduction:"",
        alertMessage:"",
        coverImage:"",
        avatarImage:""
      }
    },
    methods:{
      async emitEdit(e) {
        try{
          //驗證不爲空值
        if (!this.name || !this.introduction) {
          Toast.fire({
            icon: 'warning',
            title: '請確認填入所有資訊'
          })
          return
        } 

        if (this.name.length > 50) {
          Toast.fire({
            icon: 'warning',
            title: '暱稱最多50字'
          })
          return
        } 

        if (this.introduction.length > 160) {
          Toast.fire({
            icon: 'warning',
            title: '自我介紹最多160字'
          })
          return
        } 
          const form = e.target  // <form></form>
          const formData = new FormData(form)

          this.isProcessing = true

          const {data} = await userAPI.updateUser({
            userId: this.currentUser.id,
            formData
          })
          // console.log('data', data)
          // console.log('set current user on change page')
          // console.log(formData)
          this.$store.commit('setCurrentUser', data.updateduser)
          if (data.status !== 'success') {
            throw new Error(data.message)
          }
          
          this.showEditModal = false

          this.$emit('after-change-profile',{
            name: this.name,
            introduction: this.introduction,
            avatar: this.avatarImage || this.currentUser.avatar,
            cover: this.coverImage || this.currentUser.cover,
          })
          this.isProcessing = false
          
          this.$router.push({ name: 'user-tweets', params: { id: this.currentUser.id }})
          // this.$route.go(0)
        } catch(error){
          this.isProcessing = false
          Toast.fire({
            icon: 'error',
            title: '無法更新資料，請稍後再試'
          })
        }
      },
      deleteCover(){
        // console.log('delete cover')
        this.coverImage = this.currentUser.cover
        // console.log(document.getElementById('cover').value)
        document.getElementById('cover').value = ""
        // console.log(document.getElementById('cover').value)
      },
      handleCoverChange(e){
        const coverFiles = e.target.files
        // console.log('cover files', coverFiles)
        if(coverFiles.length === 0) {
          this.coverImage = ''
        } else {
          const coverURL = window.URL.createObjectURL(coverFiles[0])
          this.coverImage = coverURL
        }
      },
      handleAvatarChange(e){
        const avatarFiles = e.target.files
        // console.log('avatar files', avatarFiles)
        if(avatarFiles.length === 0) {
          this.avatarImage = ''
        } else {
          const avatarURL = window.URL.createObjectURL(avatarFiles[0])
          this.avatarImage = avatarURL
        }
      }
    },
    computed: {
      ...mapState(['currentUser', 'isAuthenticated'])
    },
  }
</script>
<style lang="scss" scoped>
 .outlineBtn{
    height: fit-content;
    width: fit-content;
    padding: 10px 15px;
    color: $primary;
    border: 1px solid $primary; 
    border-radius: 500px;
    @include font(15px, 1.2, normal ,700);
    &.focus{
        background-color: $primary;
        color: $white;
    }
    &:hover{
        background-color: $primary;
        color: $white;
    }

  }

  ///Modal style

  .vm{
    .save-edit-profile{
      background-color: $primary;
      color: white;
      font-size: 18px;
      font-weight: 500;
      width: 68px;
      height: 28px;
      border-radius: 100px;
      position: absolute;
      right: 15px;
      top: 15px;
    }
    .edit-cover{
      height: 200px;
      .cover-container{
        width: 598px;
        height: 200px;
        margin: 0 auto;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
        }
      }
      .select-cover{
        width: 24px;
        height: 24px;
        position: absolute;
        top: 147px;
        left: 261px;
        cursor: pointer;
        img{
          width: 24px;
          height: 24px;
          position: absolute;
          margin: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
      input{
        display: none;
      }
      .delete-cover{
        width: 24px;
        height: 24px;
        position: absolute;
        top: 147px;
        left: 315px;
        img{
          width: 24px;
          height: 24px;
          position: absolute;
          margin: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
    }
    .edit-personal-photo{
      position: absolute;
      left: 14px;
      top: 199px;
      .personal-photo-container{
        height: 120px;
        width: 120px;
        border-radius: 50%;
        border: 4px solid #ffffff;
        position: relative;
        background:#ffffff;
        .photo{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          opacity: 0.7;
        }
        .upload-avatar{
          width: 24px;
          height: 24px;
          position: absolute;
          left: 45px;
          top: 45px;
          cursor: pointer;
          img{
            width: 24px;
            height: 24px;
            position: absolute;
            margin: auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
        }
        input{
          display: none;
        }
      }
    }
    .edit-personal-info{
      height: 318px;
      .input-box{
        position: relative;
        background-color:#F5F8FA;
        width: 570px;
        border-bottom: solid 2px #657786;
        border-radius: 0px 0px 4px 4px;
        margin: 0 auto;
        &.name{
          margin: 80px auto 42px auto;
        }
        label{
          font-weight: 500;
          font-size: 15px;
          line-height: 15px;
          color: #657786;
          position: absolute;
          left: 10px;
          top: 5px;
        }
        .name-count{
          position: absolute;
          right: 0;
          bottom: -20px;
          font-size: 15px;
          font-weight: 500;
        }
        input{
          padding: 20px 0 0 10px;
          width: 570px;
          height: 54px;
          background-color:#F5F8FA;
          border: none;
          font-size: 19px;
          font-weight: 500;
          font-family: Noto Sans TC;
          font-style: normal;
          line-height: 28px;
          &:focus {
            outline: none;
          }
        }
        &.introduction{
          height: 150px;
          margin-bottom: 72px;
          border-bottom: solid 2px #657786;
        }
        textarea{
          resize: none;
          border: none;
          background-color:#F5F8FA;
          width: 540px;
          height: 130px;
          margin-bottom: 72px;
          padding: 20px 0 0 10px;
          font-size: 19px;
          font-weight: 500;
          font-family: Noto Sans TC;
          font-style: normal;
        }
        .introduction-count{
          position: absolute;
          right: 5px;
          bottom: -20px;
          font-size: 15px;
          font-weight: 500;
        }
      }

    }
  }
</style>