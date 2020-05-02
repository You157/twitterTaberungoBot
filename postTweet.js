'use strict';

/**
 * 
 * @param {twitter Object} twitter 
 * @param {String} contents 
 */
function postTweet(twitter, tweetText) {
  twitter.post('statuses/update', {
    status: tweetText
  },
    function (err, data, response) {
      console.log(data);
    }
  );
}

module.exports = postTweet;