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

let createTweetElement = function(tweet) {
  let tweetHTML = `<article class="tweetsArticle">
  <header class="article-header">
    <div class="profile-name-avatar">
      <img src="${tweet.user.avatars}" alt="avatar"/>
      <span>${tweet.user.name}</span>
    </div>
    <div class=tweetsHeader>
    ${tweet.user.handle}
    </div>
  </header>
  <div class="tweetsMiddle">${tweet.content.text}</div>
  <footer class="article-footer">
    <div class=daysCounter>${timeago.format(tweet.created_at)}</div>
    <div class=footerIcons>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;
  return tweetHTML;

};

//This wait for the page to load before calling the callback
$(document).ready(function () {
  //This is the submit handler
  $("#tweet-form").submit(function (event) {
    event.preventDefault();
    $("#tweet-text").val();

    //This is where we will add the new post request
    const url = '/tweets/';
    const data = $(this).serialize();
    const callback = function (data, status) {
      console.log(data, status);
    };
    $.post(url, data, callback);

  });
  
  const loadtweets = function () {
    $.get('/tweets', function (data, status) {
      renderTweets(data);
    });
  };
  loadtweets();
});

