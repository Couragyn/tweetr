
$(document).ready(function() {
  $("#content").keyup(function() {4
    // Determines characters left/over
    let charCount = 140 - (this.value.length);

    // updates counter with correct count
    let counter = $(this).parent().children('.counter');
    counter.text(charCount);

    // removes/adds redtext class
    if (charCount < 0) {
      counter.addClass('redText');
    } else {
      counter.removeClass('redText');
    }
    // removes error area if character count is correct for tweet
    if (charCount >= 0 && charCount < 140 && (!$('#submitError').hasClass('hidden'))) {
      $('#submitError').addClass('hidden');
    }
  });
});