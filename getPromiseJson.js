'use strict';
const requestPromise = require('request-promise'); // httpﾘｸｴｽﾄを行うﾓｼﾞｭｰﾙ

const search = 'たべるんごのうた'; // 検索ｷｰﾜｰﾄﾞ
const offset = String(Math.floor(Math.random() * (490 + 1))); // ﾗﾝﾀﾞﾑな整数を生成
const limit = '1'; // ｺﾝﾃﾝﾂの最大取得件数
const fields = 'contentId,title,viewCounter,commentCounter,tags,startTime'; // 取得する要素
const filters = '[viewCounter][gte]=10000'; // 絞込み条件 再生数1万回以上

const uri = encodeURI(
  `https://api.search.nicovideo.jp/api/v2/video/contents/` +
  `search?q=${search}&targets=tags&` +
  `fields=${fields}&` +
  `filters${filters}&_sort=-viewCounter&` +
  `_offset=${offset}&` +
  `_limit=${limit}&_context=apiguide`
);

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