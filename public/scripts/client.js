/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let renderTweets = function (tweets) {
  //resets the elements in the tweets container
  let tweetsContainer = $('.tweets').html('');

  //loops through all the array of tweets and prepends HTML formated tweeta for chronological display
  for (let tweet of tweets) {
    let tweetHTML = createTweetElement(tweet);
    tweetsContainer.prepend(tweetHTML);
  }
};

//protects against XSS Hacks
const escapeHacks = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//function takes in raw tweet object and returns HTML formated tweet
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

//waits for the page to fully load before calling the callback
$(document).ready(function() {

  $("#error-message-toolong").hide();
  $("#error-message-empty").hide();
  
  //This is the submit handler
  $("#tweet-form").submit(function(event) {
    //prevents route redirection upon submission
    event.preventDefault();

    //grabs tweet values excluding spaces at begining and the end
    let tweetValue = $("#tweet-text").val().trim();
    //checks if no character was typed or if excess was typed, returns error messages accordingly
    if (!tweetValue) {
      $("#error-message-empty").slideDown();
    } else if (tweetValue.length > 140) {
      $("#error-message-toolong").slideDown();
    } else {

      // Clears error messages
      $("#error-message-toolong").slideUp();
      $("#error-message-empty").slideUp();
      
      // POST request after errors screening
      const url = '/tweets/';
      const data = $(this).serialize();
      $.ajax({
        url: "/tweets/",
        type: "post",
        data: data
      }).then((data) => {
        //loads tweet GET request automatically without browser refresh
        loadtweets();
        //resets character counters after POST
        $("#tweet-text").val("");
        $("#tweet-text").next().find('.counter')[0]['innerText'] = 140;
      });
    }
  });
  
  // GET request function
  const loadtweets = function() {
    $.get('/tweets', function(data, status) {
      renderTweets(data);
    });
  };
  loadtweets();
});

