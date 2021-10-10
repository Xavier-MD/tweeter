/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  /* Function: Helps Avoid XSS Attacks */
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  /* Function: Creates Markup For A Given Tweet Object */
  const createTweetElement = function(tweetObject) {
    const $tweet = `
      <article>
        <header>
          <img src="${tweetObject.user.avatars}">
          <p class="name">${tweetObject.user.name}</p>
          <p class="handle">${tweetObject.user.handle}</p>
        </header>
        <p class="content">${escape(tweetObject.content.text)}</p>
        <footer>
          <p>${timeago.format(tweetObject.created_at)}</p>
          <div>
            <i class="fab fa-font-awesome-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="far fa-heart"></i>
          </div>
        </footer>
      </article>
      `;
    return $tweet;
  };

  /* Function: Combines Multiple Tweet Articles & Appends Them To 'section.all-tweets' In 'index.html' */
  const renderTweets = function(tweets) {
    let tweetsToAdd = ``;
    for (let tweet of tweets) {
      tweetsToAdd = `
      ${createTweetElement(tweet)}
      ${tweetsToAdd}
      `;
    }
    $('section.all-tweets').append(tweetsToAdd);
  };

  /* Submit Event Handler: Prevents Form Submission For A New Tweet. Instead, Sends An Ajax POST Request To '/tweets' */
  $('section.new-tweet form').submit(function(event) {
    const $inputError  = $('section.new-tweet form p.input-error');
    const $lengthError = $('section.new-tweet form p.length-error');
    const $textArea    = $('section.new-tweet form textarea');
    const $counter     = $('section.new-tweet form div output');
    const formData     = $('section.new-tweet form').serialize();
    const tweetsUrl    = "http://localhost:8080/tweets";
    event.preventDefault();
    if ($textArea.val().trim() === '' || $textArea.val().trim() === null) {
      $inputError.slideDown();
      return;
    } else if ($textArea.val().length > 140) {
      $lengthError.slideDown();
      return;
    }
    $.ajax({data: formData, url: tweetsUrl, method: 'POST'})
      .then(function() {
        $("section.all-tweets").empty();
        $inputError.slideUp();
        $lengthError.slideUp();
        $textArea.val("");
        $counter.text("140");
        loadTweets();
      });
  });

  /* Submits An Ajax Get Request To /tweets */
  const loadTweets = function() {
    const tweetsUrl = "http://localhost:8080/tweets";
    $.ajax({url: tweetsUrl, method: 'GET'})
      .then(function(response) {
        renderTweets(response);
      });
  };

  /* Load All Tweets Upon Realoading The Page */
  loadTweets();

});