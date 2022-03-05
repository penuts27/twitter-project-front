import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  // 帶入需要的參數
  adminSignIn ({ account, password }) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.post('/admin/signin', {
      account,
      password
    })
  },
  adminGetUsers() {
    return apiHelper.get('/admin/users', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  adminGetTweets() {
    return apiHelper.get('/admin/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  adminDeleteTweet(TweetID) {
    return apiHelper.delete(`/admin/tweets/${TweetID}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}