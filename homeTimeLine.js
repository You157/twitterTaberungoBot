'use strict';

// 調査済みリスト
let checkedTweets = [];

// ﾎｰﾑﾀｲﾑﾗｲﾝを取得する
function getHomeTimeLine(twitter) {
  twitter.get('statuses/home_timeline', {}, (error, tweets, response) => {
    if (error) console.log(error);
    // 初回起動時は全tweetをcheckedTweetsに格納
    if (checkedTweets.length === 0) {
      tweets.forEach((homeTimeLineTweet, key) => {
        checkedTweets.push(homeTimeLineTweet);
      });
      return;
    }
    // 新規tweetをnowTweetsに格納
    const newTweets = [];
    tweets.forEach((homeTimeLineTweet, key) => {
      // checkedTweetとnewTweetsを比較する
      if (isCheckedTweet(homeTimeLineTweet) === false) {
        responseHomeTimeLine(homeTimeLineTweet);
        // 新しいツイートを追加
        newTweets.push(homeTimeLineTweet);
      }
    });
    // 調査済みリストに追加と、千個を超えていたら削除
    checkedTweets = newTweets.concat(checkedTweets); // 配列の連結
    // 古い要素を消して要素数を1000個にする。
    if (checkedTweets.length > 1000) checkedTweets.length = 1000;
  });
}

function isCheckedTweet(homeTimeLineTweet) {
  // ボット自身のツイートは無視する。
  if (homeTimeLineTweet.user.screen_name === user_screen_name) {
    return true;
  }
  for (let checkedTweet of checkedTweets) {
    // 同内容を連続投稿をするアカウントがあるため、一度でも返信した内容は返信しない仕様にしています。
    // 投稿IDが同じ or 投稿テキストが同じ場合はtrue
    if (checkedTweet.id_str === homeTimeLineTweet.id_str || checkedTweet.text === homeTimeLineTweet.text) {
      return true;
    }
  }
  return false;
}

module.exports = getHomeTimeLine;