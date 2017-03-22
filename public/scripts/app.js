/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('article').mouseover(function() {
    $(this).find('header').removeClass("opaque");
  });
  $('article').mouseleave(function() {
    $(this).find('header').addClass("opaque");
  });
});