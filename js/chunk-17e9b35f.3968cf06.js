(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-17e9b35f"],{"158c":function(e,t,a){},"1c9a":function(e,t,a){e.exports=a.p+"img/back.07695ee6.svg"},"4fa3":function(e,t,a){"use strict";a("9e83")},"9e83":function(e,t,a){},a846:function(e,t,a){"use strict";a("158c")},b0c6:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"wrapper"},[r("div",{staticClass:"gridWrapper"},[r("div",{staticClass:"navbarWrapper"},[r("Navbar")],1),r("main",[r("div",{staticClass:"card-list"},[r("div",{staticClass:"head"},[r("i",{on:{click:function(t){return e.$router.back()}}},[r("img",{attrs:{src:a("1c9a"),alt:""}})]),e._m(0)])]),r("TweetDetail",{on:{"after-reply-tweet":e.afterReplyTweet}}),e.tweets.length?e._l(e.tweets,(function(e){return r("Tweet",{key:e.id,attrs:{initTweet:e,initLikesAndReplies:!1}})})):r("NoTweet",{attrs:{initText:"尚沒有任何回復~"}})],2),r("div",{staticClass:"popularList"},[r("PopularUser")],1)])])},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"userInfo"},[a("h2",[e._v("推文")])])}],i=a("5530"),s=a("1da1"),c=(a("96cf"),a("d9e2"),a("d81d"),a("b0c0"),a("a4d3"),a("e01a"),a("d178")),o=a("ac1a"),u=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"tweet-detail"},[r("div",{staticClass:"detail-user"},[r("div",{staticClass:"avatar-wrapper"},[r("Avatar",{attrs:{initUserId:e.tweet.UserId,initImage:e.tweet.User.avatar}})],1),r("div",{staticClass:"detail-name"},[r("div",{staticClass:"name"},[e._v(e._s(e.tweet.User.name))]),r("div",{staticClass:"account-name"},[e._v(e._s(e.tweet.User.account))])])]),r("div",{staticClass:"tweet-content"},[e._v(e._s(e.tweet.description))]),r("div",{staticClass:"detail-time"},[r("div",{staticClass:"time"},[e._v(e._s(e._f("timeFormate")(e.tweet.createdAt)))])]),r("div",{staticClass:"reactions"},[r("div",{staticClass:"reaction"},[r("a",{attrs:{href:"#"}},[e._v(e._s(e.tweet.likeCount))]),r("span",[e._v("喜歡次數")])]),r("div",{staticClass:"reaction"},[r("a",{attrs:{href:"#"}},[e._v(e._s(e.tweet.replyCount))]),r("span",[e._v("回覆")])])]),r("div",{staticClass:"icon-group"},[r("a",{attrs:{href:"#"}},[r("MainReplyModal",{attrs:{initTweet:e.modelData},on:{"after-reply-tweet":e.afterReplyTweet}})],1),r("a",{staticClass:"favorite",attrs:{href:"#"}},[e.tweet.isLike?r("i",{on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.handleUnLike(e.tweet.id)}}},[r("img",{attrs:{src:a("d00e"),alt:"加入最愛中"}})]):r("i",{on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.handleAddLike(e.tweet.id)}}},[r("img",{attrs:{src:a("d6fa"),alt:"尚未加入最愛"}})])])])])},d=[],l=a("df3a"),p=a("7482"),f=a("2fa3"),w=a("c1df"),v=a.n(w),m=a("3e96"),h={name:"tweetDetail",components:{Avatar:l["a"],MainReplyModal:m["a"]},data:function(){return{tweet:{},modelData:{accountName:"",createdAt:"",description:"",id:-1,image:"",isLiked:!1,likeCount:0,name:"",replyCount:0,userId:-1},isLoading:!1}},methods:{fetchTweetDetail:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n,i,s,c,o,u,d,l,w,v,m,h,k;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,p["a"].getTweet({tweetId:e});case 3:if(r=a.sent,n=r.data,i=r.statusText,"OK"===i){a.next=8;break}throw new Error(i);case 8:t.tweet=n,s=n.createdAt,c=n.description,o=n.id,u=n.isLike,d=n.likeCount,l=n.replyCount,w=n.UserId,v=n.User,m=v.account,h=v.name,k=v.avatar,t.modelData={accountName:m,createdAt:s,description:c,id:o,image:k,isLike:u,likeCount:d,name:h,replyCount:l,userId:w},a.next=18;break;case 14:a.prev=14,a.t0=a["catch"](0),console.log("error",a.t0.message),f["a"].fire({icon:"error",title:"獲取貼文資料失敗，請稍後再試"});case 18:case"end":return a.stop()}}),a,null,[[0,14]])})))()},afterReplyTweet:function(e){this.$emit("after-reply-tweet",e)},handleAddLike:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!0!==t.isLoading){a.next=2;break}return a.abrupt("return");case 2:return a.prev=2,t.isLoading=!0,a.next=6,p["a"].addLike({tweetId:e});case 6:if(r=a.sent,n=r.statusText,"OK"===n){a.next=10;break}throw new Error(n);case 10:t.tweet=Object(i["a"])(Object(i["a"])({},t.tweet),{},{likeCount:t.tweet.likeCount+1,isLike:!0}),t.isLoading=!1,a.next=19;break;case 14:a.prev=14,a.t0=a["catch"](2),console.log("error",a.t0.message),f["a"].fire({icon:"error",title:"加到喜歡失敗，請稍後再試"}),t.isLoading=!1;case 19:case"end":return a.stop()}}),a,null,[[2,14]])})))()},handleUnLike:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!0!==t.isLoading){a.next=2;break}return a.abrupt("return");case 2:return a.prev=2,t.isLoading=!0,a.next=6,p["a"].unLike({tweetId:e});case 6:if(r=a.sent,n=r.statusText,"OK"===n){a.next=10;break}throw new Error(n);case 10:t.tweet=Object(i["a"])(Object(i["a"])({},t.tweet),{},{likeCount:t.tweet.likeCount-1,isLike:!1}),t.isLoading=!1,a.next=19;break;case 14:a.prev=14,a.t0=a["catch"](2),console.log("error",a.t0.message),f["a"].fire({icon:"error",title:"收回喜歡失敗，請稍後再試"}),t.isLoading=!1;case 19:case"end":return a.stop()}}),a,null,[[2,14]])})))()}},created:function(){var e=this.$route.params.id;this.fetchTweetDetail(e)},filters:{timeFormate:function(e){return e?!1===v()(e).isValid?"-":v()(e).format("A HH:mm•YYYY年MM月DD日"):"-"}}},k=h,g=(a("4fa3"),a("2877")),b=Object(g["a"])(k,u,d,!1,null,"5f6d1e5a",null),C=b.exports,x=a("0bf5"),T=a("d3f7"),_=a("2f62"),L={name:"Reply",components:{Navbar:c["a"],PopularUser:x["a"],TweetDetail:C,Tweet:o["a"],NoTweet:T["a"]},data:function(){return{tweets:[]}},methods:{fetchTweets:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,p["a"].getTweetReply({tweetId:e});case 3:if(r=a.sent,n=r.data,i=r.statusText,"OK"===i){a.next=8;break}throw new Error(i);case 8:t.tweets=n.map((function(e){var t=e.comment,a=e.createdAt,r=e.updatedAt,n=e.id,i=e.User,s=e.Tweet,c=i.account,o=i.avatar,u=i.id,d=i.name;return{id:n,UserId:u,description:t,createdAt:a,updatedAt:r,userId:u,User:{id:u,name:d,account:c,avatar:o},replyPerson:s.User.name}})),a.next=15;break;case 11:a.prev=11,a.t0=a["catch"](0),console.log("error",a.t0),f["a"].fire({icon:"error",title:"無取取得推文回覆資料，請稍後再試"});case 15:case"end":return a.stop()}}),a,null,[[0,11]])})))()},afterReplyTweet:function(e){var t=e.id,a=e.description,r={id:t,UserId:this.currentUser.id,description:a,createdAt:new Date,User:{name:this.currentUser.name,account:this.currentUser.account?this.currentUser.account:"找不到帳戶",avatar:this.currentUser.avatar}};this.tweets.unshift(r)}},created:function(){var e=this.$route.params.id;this.fetchTweets(e)},computed:Object(i["a"])({},Object(_["b"])(["currentUser"]))},U=L,y=(a("a846"),Object(g["a"])(U,r,n,!1,null,"a94c41bc",null));t["default"]=y.exports}}]);
//# sourceMappingURL=chunk-17e9b35f.3968cf06.js.map