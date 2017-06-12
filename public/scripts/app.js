/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
require('dotenv').config();

$(document).ready(function() {
  // jQuery used to calulate how long ago something was posted
  jQuery("time.timeago").timeago();

  // Sets up for when a tweet is posted
  let $button = $('#content').next();
  $button.on('click', function(event) {
    event.preventDefault();
    let content = $('#content').val();
    // makes sure characters are between 1 and 140
    if (content.trim().length < 1 || content.length > 140) {
      // if not correct length, shows an error message and resets count
      $('#submitError').removeClass('hidden');
      ($('.counter').text('140'))
    } else {
      // posts to database and resets to submit area to default
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $('#content').serialize()
      }).done(function(tweets) {
        renderTweets([tweets]);
      }).done(mouseHover)
      .done($('#content').val(''))
      .done($('.counter').text('140'))
      .done($('#submitError').addClass('hidden'));
    }
  })

  // when compose is clicked, toggles submit area
  $('#toggleCompose').click(function() {
    $('.new-tweet').slideToggle();
    $('.new-tweet').find('#content').focus();
  });

  // /initializes tweets
  loadTweets();

});

// changes area when mouse hovers over tweet
function mouseHover() {
  $('article').mouseover(function() {
    $(this).find('header').removeClass("opaque");
    $(this).find('footer').find('div').removeClass("hidden");
  });
  $('article').mouseleave(function() {
    $(this).find('header').addClass("opaque");
    $(this).find('footer').find('div').addClass("hidden");
  });
}

// Creats tweet from form data
function createTweetElement(tweet) {
  // sets entered values to variables
  let user = tweet.user;
  let avatar = user.avatars.small;
  let uname = user.name;
  let handle = user.handle;
  let content = tweet.content.text;
  let date = jQuery.timeago(tweet.created_at);

  // creates the article element that contains tweet
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

// renders the created tweet to index
function renderTweets(tweets) {
  for (let i = 0; i < tweets.length; i ++) {
    $('#tweets-container').prepend(createTweetElement(tweets[i]));
  }
}

// Get method for tweets
function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (result) {
      renderTweets(result);
    }
  }).done(mouseHover);
}