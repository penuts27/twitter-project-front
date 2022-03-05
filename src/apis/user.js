import { apiHelper } from '../utils/helpers'

const getToken = () => localStorage.getItem('token')

export default {
    getCurrentUser(){
        return apiHelper.get('currentuser',{
             headers: { Authorization: `Bearer ${getToken()}`}
        })
    },
    getUser({userId}){
        return apiHelper.get(`users/${userId}`,{
            headers: { Authorization: `Bearer ${getToken()}`}
        })
    },
    getUserTweets({userId}){
        return apiHelper.get(`users/${userId}/tweets`,{
            headers: { Authorization: `Bearer ${getToken()}`}
        })
    },
    getUserRepliesTweet({userId}){
        return apiHelper.get(`users/${userId}/replied_tweets`,{
            headers: { Authorization: `Bearer ${getToken()}`}
        })
    },
    getUserLikesTweet({userId}){
        return apiHelper.get(`users/${userId}/likes`,{
            headers: { Authorization: `Bearer ${getToken()}`}
        })
    },
    getUserFollowers({userId}){
        return apiHelper.get(`users/${userId}/followers`,{
            headers: { Authorization: `Bearer ${getToken()}`}
        })
    },
    getUserFollowings({userId}){
        return apiHelper.get(`users/${userId}/followings`,{
            headers: { Authorization: `Bearer ${getToken()}`}
        })
    },
    getUsersTop(){
        return apiHelper.get('/users/top',{
            headers: { Authorization: `Bearer ${getToken()}`}
        })
    },
    //setting user
    updateUser({ userId, formData }){
        return apiHelper.put(`users/${userId}`, formData, {
            headers: { Authorization: `Bearer ${getToken()}`}
        })
    },
}