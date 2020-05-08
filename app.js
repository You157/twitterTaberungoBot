  
'use strict';
const Twit = require('twit');
const cron = require('cron').CronJob;
const getRequestJson = require('./getPromiseJson');
const postTweet = require('./postTweet');


// Twitterアカウントを取得
const twitter = new Twit({
  consumer_key: process.env.TWITTER_API_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_API_CONSUMER_SECRET,
  access_token: process.env.TWITTER_API_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET
});

/**
const responses = ['んご！', 'んご', 'んごー', 'んごー！', 'んご♪', 'んご…', 'あは♪', 'こいつはりんごろう', 'こいつはりんごの精です'];
// リプライにたいして反応する
function responseHomeTimeLine(homeTimeLineTweet) {
  const tweetMessage = '@' + homeTimeLineTweet.user.screen_name + '「' + homeTimeLineTweet.text + '」 ' + responses[Math.floor(Math.random() * responses.length)];
  twitter.post('statuses/update', {
    status: tweetMessage,
    in_reply_to_status_id: homeTimeLineTweet.id_str
  }).then((tweet) => {
    console.log(tweet);
  }).catch((error) => {
    throw error;
  });
}
 */

// 指定の文字列tweetがあった時に処理する
const stream = twitter.stream('statuses/filter', { track: `@taberungo` }); // track: 検索したい文字列
stream.on('tweet', function (tweet) {
  console.log(tweet);
  /**
  const tweetMessage = '@' + tweet.user.screen_name + ' 呼んだ？　(*´ω｀*)';
  twitter.post('statuses/update', {
    status: tweetMessage, // 返信するテキスト
    in_reply_to_status_id: tweet.id_str // 返信する対象のID
  })
    .then((tweet) => {
      console.log(tweet);
    })
    .catch((error) => {
      throw error;
    });
   */
});
stream.on('error', function (error) {
  throw error;
});

// 定期的にﾂｲｰﾄします
/**
const cronJobTweet = new cron({
  cronTime: '00 00 0-23/1 * * *',
  start: true,
  onTick: () => {
    getRequestJson().then((contents) => {
      postTweet(twitter, tweetText(contents));
    });
  }
});
 */

// ﾂｲｰﾄするﾃｷｽﾄを作成します
function tweetText(contents) {
  // const index = Math.floor(Math.random() * contents.length);
  // const content = contents[index];
  const content = contents[0];
  const contentId = content['contentId'];
  const title = content['title'];
  const viewCounter = content['viewCounter'];
  const commentCounter = content['commentCounter'];
  // const description = content['description'].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '').slice(0, 40);
  const tags = content['tags'].split(' ');
  const url = `https://nico.ms/${contentId}?ref=twitter_ss`;
  // const tweetText = `#たべるんごのうた\n\n${title}\n\n${description}...\n再生数：${viewCounter},  コメント数：${commentCounter}\n${url}`;
  let tweetText = '';
  tags.forEach(element => {
    tweetText += `#${element} `;
  });
  tweetText += `\n\n${title}\n\n再生数:${viewCounter},  コメント数:${commentCounter}\n${url}`;
  return tweetText;
}

// ﾌﾟﾛｸﾞﾗﾑ起動時にｺﾝﾃﾝﾂ取得とﾂｲｰﾄを行います
getRequestJson().then((contents) => {
  postTweet(twitter, tweetText(contents));
  // console.log(tweetText(contents));
});
