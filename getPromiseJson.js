'use strict';
const requestPromise = require('request-promise'); // httpﾘｸｴｽﾄを行うﾓｼﾞｭｰﾙ

const search = 'たべるんごのうた'; // 検索ｷｰﾜｰﾄﾞ
const limit = '50'; // ｺﾝﾃﾝﾂの最大取得件数
const fields = 'contentId,title,description,viewCounter,commentCounter'
const uri = encodeURI(`https://api.search.nicovideo.jp/api/v2/video/contents/search?q=${search}&targets=tags&fields=${fields}&filters[viewCounter][gte]=100000&_sort=-viewCounter&_limit=${limit}&_context=apiguide`);

const options = {
  uri: uri,
  method: 'GET',
  json: true
}

// Jsonを格納したPromiseを返す関数です
function getRequestJson() {
  const promise = new Promise((resolve, reject) => {
    requestPromise(options)
      .then((res) => { resolve(res.data); })
      .catch((error) => { console.log(error.message); });
  });
  return promise;
}

module.exports = getRequestJson;