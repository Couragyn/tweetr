/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  function createTweetElement (tweet) {
    let user = tweet.user;
    let avatar = user.avatars.small;
    let uname = user.name;
    let handle = user.handle;
    let content = tweet.content.text;
    let date = tweet.created_at;

    var $tweet = $('<article>')
      .append($('<header>').addClass('opaque')
      .append($('<img>').attr("src", avatar))
      .append($('<p>').text(uname))
      .append($('<p>').addClass('handle').text(handle)))
      .append($('<p>').text(content))
      .append($('<footer>')
      .append($('<span>').text(date))
      .append($('<div>').addClass("hidden")
      .append($('<i>').addClass("fa fa-flag").attr("aria-hidden", "true"))
      .append($('<i>').addClass("fa fa-retweet").attr("aria-hidden", "true"))
      .append($('<i>').addClass("fa fa-heart").attr("aria-hidden", "true"))));

    return $tweet;
  }


  function renderTweets(tweets) {
    for (let i = 0; i < data.length; i ++) {
      $('#tweets-container').append(createTweetElement(data[i]));
    }
    return $tweet;
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
  }

// Fake data taken from tweets.json
  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
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
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  var $tweet = renderTweets(data);





  $('article').mouseover(function() {
    $(this).find('header').removeClass("opaque");
    $(this).find('footer').find('div').removeClass("hidden");
  });
  $('article').mouseleave(function() {
    $(this).find('header').addClass("opaque");
    $(this).find('footer').find('div').addClass("hidden");
  });

});