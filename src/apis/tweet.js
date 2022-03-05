import { apiHelper } from '../utils/helpers'

const getToken = () => localStorage.getItem('token')

export default {
    getMainTweet(){
        return apiHelper.get('/tweets',{
            headers: { Authorization: `Bearer ${getToken()}` } 
        })
    },
    getTweet({tweetId}){
        return apiHelper.get(`/tweets/${tweetId}`,{
            headers: { Authorization: `Bearer ${getToken()}` } 
        })
    }
    ,
    getTweetReply({tweetId}){
        return apiHelper.get(`/tweets/${tweetId}/replies`,{
            headers: { Authorization: `Bearer ${getToken()}` } 
        })
    },
    createTweet(tweetData){
        return apiHelper.post('/tweets', tweetData,{
            headers: { Authorization: `Bearer ${getToken()}` } 
        })
    },
    addLike({tweetId}){
        console.log(tweetId )
        return apiHelper.post(`/tweets/${tweetId}/like`,null, {
            headers: { Authorization: `Bearer ${getToken()}` } 
        })
    },
     unLike({tweetId}){
        return apiHelper.post(`/tweets/${tweetId}/unlike`,null, {
            headers: { Authorization: `Bearer ${getToken()}` } 
        })
    },
    replyTweet({tweetId, comment}){
        return apiHelper.post(`/tweets/${tweetId}/replies`,{TweetId: tweetId, comment},
         {
            headers: { Authorization: `Bearer ${getToken()}` } 
        })
    }
}