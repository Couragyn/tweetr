
$(document).ready(function() {
  $("#content").keyup(function() {
    // Determines characters left/over
    let charCount = 140 - (this.value.length);

    // updates counter with correct count
    let counter = $(this).parent().children('span');
    counter.text(charCount);

    // removes/adds redtext class
    if (charCount < 0) {
      counter.addClass('redText');
    } else {
      counter.removeClass('redText');
    }
  });
});