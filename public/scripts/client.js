/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let renderTweets = function (tweets) {
  let tweetsContainer = $('.tweets').html(''); //resets the elements in the tweets container

  for (let tweet of tweets) { //loops throough all the tweets
    let tweetHTML = createTweetElement(tweet);
    tweetsContainer.prepend(tweetHTML);
  }
};
const escapeHacks = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


let createTweetElement = function(tweet) {
  let tweetHTML = `<article class="tweets-article">
  <header class="article-header">
    <div class="profile-name-avatar">
      <img src="${tweet.user.avatars}" alt="avatar"/>
      <span>${tweet.user.name}</span>
    </div>
    <div class="tweets-header">
    ${tweet.user.handle}
    </div>
  </header>
  <div class="tweets-middle">${escapeHacks(tweet.content.text)}</div>
  <footer class="article-footer">
    <div class="days-counter">${timeago.format(tweet.created_at)}</div>
    <div class="footer-icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;
  return tweetHTML;
};

//This wait for the page to load before calling the callback
$(document).ready(function() {
  $("#error-message-toolong").hide();
  $("#error-message-empty").hide();
  //This is the submit handler
  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    let tweetValue = $("#tweet-text").val().trim();

    if (!tweetValue) {
      $("#error-message-empty").slideDown();
    } else if (tweetValue.length > 140) {
      $("#error-message-toolong").slideDown();
    } else {
      $("#error-message-toolong").slideUp();
      $("#error-message-empty").slideUp();

      //This is where we will add the new post request
      const url = '/tweets/';
      const data = $(this).serialize();
      $.ajax({
        url: "/tweets/",
        type: "post",
        data: data
      }).then((data) => {
        console.log('tweet sent');
        loadtweets();
        $("#tweet-text").val("");
        $("#tweet-text").next().find('.counter')[0]['innerText'] = 140;
      });
    }
  });
  
  const loadtweets = function() {
    $.get('/tweets', function(data, status) {
      renderTweets(data);
    });
  };
  loadtweets();
});

