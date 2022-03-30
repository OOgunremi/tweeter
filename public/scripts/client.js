/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let initialTweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1648500657736
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1648587057736
  }
];
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

$(document).ready(function() {
  renderTweets(initialTweets);
});
