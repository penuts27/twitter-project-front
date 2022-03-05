import { apiHelper } from '../utils/helpers'

const getToken = () => localStorage.getItem('token')

export default {
    followUser({userId}){
        return apiHelper.post(`/followships`, {id: userId}, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    unFollowUser({userId}){
        return apiHelper.delete(`/followships/${userId}`,{
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    }
}