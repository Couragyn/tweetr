/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  jQuery("time.timeago").timeago();

  let $button = $('#content').next();
  $button.on('click', function(event) {
    event.preventDefault();
    let contLen = $('#content').val().length;
    if (contLen < 1 || contLen > 140) {
      $('#submitError').removeClass('hidden');
    } else {
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

  $('#toggleCompose').click(function() {
    $('.new-tweet').slideToggle();
    $('.new-tweet').find('#content').focus();
  });


  loadTweets();

});


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


function createTweetElement(tweet) {
  let user = tweet.user;
  let avatar = user.avatars.small;
  let uname = user.name;
  let handle = user.handle;
  let content = tweet.content.text;
  let date = jQuery.timeago(tweet.created_at);

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
  for (let i = 0; i < tweets.length; i ++) {
    $('#tweets-container').prepend(createTweetElement(tweets[i]));
  }
}

function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (result) {
      renderTweets(result);
    }
  }).done(mouseHover);
}