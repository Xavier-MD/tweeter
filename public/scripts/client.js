/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  /* Creates Markup For Corresponding Tweet Objects */

  const createTweetElement = function(tweetObject) {
    const $tweet = `
      <article>
        <header>
          <p>${tweetObject.user.name}</p>
          <p class="handle">${tweetObject.user.handle}</p>
        </header>
        <p class="content">${escape(tweetObject.content.text)}</p>
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

    return $tweet;
  };

  /* Combines An Array Of Tweet Articles & Appends Them In 'index.html' */

  const renderTweets = function(tweets) {
    let tweetsToAdd = '';
    for (let tweet of tweets) {
      tweetsToAdd = `
      ${createTweetElement(tweet)}
      ${tweetsToAdd}
      `;
    }
    $('.all-tweets').append(tweetsToAdd);
  };

  /* Prevents Form Submission Of New Tweet, Sends Ajax Request & POSTS To /tweets */

  $('section.new-tweet form').submit(function(event) {
    const $form     = $('section.new-tweet form');
    const $textArea = $('section.new-tweet form textarea');
    const $counter  = $('section.new-tweet form output');
    const formData  = $form.serialize();
    const tweetsUrl = "http://localhost:8080/tweets";
    event.preventDefault();
    if ($textArea.val().trim() === '' || $textArea.val().trim() === null) {
      alert('The text area cannot be left blank.');
      return;
    } else if ($textArea.val().length > 140) {
      alert('The text area cannot exceed 140 characters.');
      return;
    }
    $.ajax({data: formData, url: tweetsUrl, method: 'POST'})
      .then(function() {
        $("section.all-tweets").empty();
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

  /* Escape Function To Avoid XSS Attacks */

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  /* Load All Tweets Upon Realoading The Page */
  
  loadTweets();

});