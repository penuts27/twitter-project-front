

// ./src/router/index.js
import VueModal from '@kouts/vue-modal'
import '../assets/style/vue-modal.css'
Vue.component('Modal', VueModal)

import store from './../store'


import Vue from 'vue'
import VueRouter from 'vue-router'
import LognIn from '../views/LogIn.vue'
import Regist from '../views/Regist.vue'
import Setting from '../views/Setting.vue'
import AdminLogIn from '../views/AdminLogIn.vue'
import AdminTweets from '../views/AdminTweets.vue'
import AdminUsers from '../views/AdminUsers.vue'
import NotFound from '../views/NotFound.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

//驗證是否爲管理者
const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role !== 'admin') {
    next('/404')
    return
  }

  next()
}

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

//驗證是否爲使用者ser
const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role !== 'user') {
    next('/404')
    return
  }

  next()
}

const routes = [
  // 根目錄
  {
    path: '/',
    name: 'root',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'log-in',
    component: LognIn
  },
  {
    path: '/regist',
    name: 'regist',
    component: Regist
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
    beforeEnter: authorizeIsUser
  },
  {
    path: '/admin',
    name: 'adminRoot',
    redirect: '/adminlogin'
  },
  {
    path: '/adminlogin',
    name: 'adminlog-in',
    component: AdminLogIn,
  },
  {
    path: '/admintweets',
    name: 'admintweets',
    component: AdminTweets,
    beforeEnter: authorizeIsAdmin

  },
  {
    path: '/adminusers',
    name: 'adminusers',
    component: AdminUsers,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/publicroom',
    name: 'public-room',
    component: () => import('@/views/ChatRoomPublic.vue')
  },
  // 首頁
  {
    path: '/main',
    name: 'main',
    component: Main,
    beforeEnter: authorizeIsUser
  },
  // 推文回覆頁
  {
    path: '/tweet/:id',
    name: 'tweet',
    component: () => import('@/views/Reply.vue')
  },
  // user系列
  {
    path: '/user/:id',
    component: () => import('@/views/User.vue'),
    children: [
      // 推文
      {
        path: 'tweets',
        name: 'user-tweets',
        component: () => import('@/components/Content/TweetContent.vue')
      },
      // 推文與回覆
      {
        path: 'replies',
        name: 'user-replies',
        component: () => import('@/components/Content/ReplyContent.vue')
      },
      // 喜歡的內容
      {
        path: 'likes',
        name: 'user-likes',
        component: () => import('@/components/Content/LikeContent.vue')
      },
      {
        path: 'followings',
        name: 'user-followings',
        component: () => import('@/components/Content/FollowingContent.vue')
      },
      {
        path: 'followers',
        name: 'user-followers',
        component: () => import('@/components/Content/FollowerContent.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = new VueRouter({
  linkActiveClass: 'part-active',
  linkExactActiveClass: 'active',
  routes,
})

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  // // 從 localStorage 取出 token
  // const token = localStorage.getItem('token')

  // // 預設是尚未驗證
  // let isAuthenticated = false
  let isAuthenticated = store.state.isAuthenticated

  // // 如果有 token 的話才驗證
  // if (token) {
  //   // 取得驗證成功與否
  //   isAuthenticated = await store.dispatch('fetchCurrentUser')
  // }

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['log-in', 'regist', 'adminlog-in']

  // 如果 token 無效且進入需要驗證的頁面則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/login')
    return
  }

  // 如果 token 有效且進入不需要驗證到頁面則轉址到首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/main')
    return
  }
  next()
})

// 試著跳轉頁面回到頂部
router.afterEach(() => {
  window.scrollTo(0, 0)
})
export default router

