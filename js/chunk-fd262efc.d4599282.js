(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fd262efc"],{"3e8b":function(e,t,r){},"91eb":function(e,t,r){"use strict";r("3e8b")},b687:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"wrapper"},[r("Header",{attrs:{initUser:e.user}}),r("PersonalCard",{attrs:{initUser:e.user}}),r("UserNavTabs"),e.tweets.length?e._l(e.tweets,(function(e){return r("Tweet",{key:e.id,attrs:{initLikesAndReplies:!1,initTweet:e}})})):r("NoTweet",{attrs:{initText:"該用戶目前沒有回覆~"}})],2)},a=[],o=r("5530"),s=r("1da1"),c=(r("96cf"),r("d9e2"),r("d81d"),r("b0c0"),r("ac1a")),i=r("cc45"),u=r("1602"),d=r("6002"),l=r("2fa3"),w=r("2f62"),f=r("d3f7"),p=r("0418"),m={name:"ReplyContent",components:{PersonalCard:d["a"],Tweet:c["a"],NoTweet:f["a"],UserNavTabs:i["a"],Header:p["a"]},data:function(){return{tweets:[],user:{id:-1,email:"",password:"",name:"",account:"",role:"",avatar:"",introduction:"",cover:"",tweetCount:null,followingCount:null,followerCount:null,likedCount:null,createdAt:"",updatedAt:"",isFollowed:!1}}},methods:{fetchTweets:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var n,a,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,u["a"].getUserRepliesTweet({userId:e});case 3:if(n=r.sent,a=n.data,o=n.statusText,"OK"===o){r.next=8;break}throw new Error(o);case 8:t.tweets=a.map((function(e){return{id:e.Tweet.id,UserId:e.User.id,description:e.comment,createdAt:e.createdAt,updatedAt:e.updatedAt,userId:e.User.id,User:{id:e.User.id,name:e.User.name,account:e.User.account,avatar:e.User.avatar},replyPerson:e.Tweet.User.account}})),r.next=15;break;case 11:r.prev=11,r.t0=r["catch"](0),console.log("error",r.t0.message),l["a"].fire({icon:"error",title:"未能取得使用者推文，請稍後再試"});case 15:case"end":return r.stop()}}),r,null,[[0,11]])})))()},fetchUser:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var n,a,s,c,i,d,w,f,p,m,v,b,h,U,C,T,k,g;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,u["a"].getUser({userId:e});case 3:if(n=r.sent,a=n.data,s=n.statusText,c=a.id,i=a.email,d=a.name,w=a.account,f=a.role,p=a.avatar,m=a.introduction,v=a.cover,b=a.tweetCount,h=a.followingCount,U=a.followerCount,C=a.likedCount,T=a.createdAt,k=a.updatedAt,g=a.isFollowed,"OK"===s){r.next=9;break}throw new Error(s);case 9:t.user=Object(o["a"])(Object(o["a"])({},t.user),{},{id:c,email:i,name:d,account:w,role:f,avatar:p,introduction:m,cover:v,tweetCount:b,followingCount:h,followerCount:U,likedCount:C,createdAt:T,updatedAt:k,isFollowed:g}),r.next=16;break;case 12:r.prev=12,r.t0=r["catch"](0),console.log("error",r.t0),l["a"].fire({icon:"error",title:"未能取得使用者資料，請稍後再試"});case 16:case"end":return r.stop()}}),r,null,[[0,12]])})))()}},created:function(){var e=this.$route.params.id;this.fetchUser(e),this.fetchTweets(e)},computed:Object(o["a"])({},Object(w["b"])(["currentUser"]))},v=m,b=(r("91eb"),r("2877")),h=Object(b["a"])(v,n,a,!1,null,"5cf0dc7c",null);t["default"]=h.exports}}]);
//# sourceMappingURL=chunk-fd262efc.d4599282.js.map