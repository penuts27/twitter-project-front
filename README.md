@ twitter-front-end

@線上版本網址：
https://lgtits.github.io/twitter/

# 將專案複製到本機
```
git clone https://github.com/lgtits/twitter-front-end.git
```

## 安裝相關套件
```
cd twitter-front-end
npm install
```

### 啟動專案
```
npm run serve
```

### 連接資料庫設定
欲連接heroku遠端資料庫，請至../twitter-front-end/src/helper.js，選擇：
```
const baseURL = 'https://sheltered-ravine-31386.herokuapp.com/api'
```
若欲連接本地資料庫，請至../twitter-front-end/src/helper.js，選擇：
```
const baseURL = 'http://localhost:3000/api'
```
後端專案資料庫下載位置：
https://github.com/dandywhy/twitter-api-2020



## 共用帳號
下面 2 組帳號為測試帳號：
* 第一組帳號有 admin 權限：
  * account: root
  * password: 12345678
* 第二組帳號沒有 admin 權限：
  * account: user1
  * password: 12345678


## 作者
Will (401450349@gapp.fju.edu.tw)  
紀陶 (0937370704@gmail.com)

