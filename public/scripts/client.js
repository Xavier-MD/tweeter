/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    let $tweets = '';
    for (let tweet of tweets) {
      $tweets = `
      ${$tweets}
      ${createTweetElement(tweet)}
      `;
    }
    $('.all-tweets').append($tweets);
  };

  const createTweetElement = function(tweetObject) {
    const $Tweet = `
      <article>
        <header>
          <p>${tweetObject.user.name}</p>
          <p class="handle">${tweetObject.user.handle}</p>
        </header>
        <p class="content">${tweetObject.content.text}</p>
        <footer>
          <p>${timeago.format(tweetObject.created_at)}</p>
          <div class="icons">
            <i class="fab fa-font-awesome-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="far fa-heart"></i>
          </div>
        </footer>
      </article>
      `;
    return $Tweet;
  };

  renderTweets(data);

});
