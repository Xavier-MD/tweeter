$(document).ready(function() {
  $('#tweet-text').keyup(function() {
    let textCount = 140 - $(this).val().length;
    $('#tweet-counter').text(textCount);
    if (textCount >= 0) {
      $('#tweet-counter').removeClass('negative');
      $('#tweet-counter').addClass('positive');
    } else if (textCount < 0) {
      $('#tweet-counter').removeClass('positive');
      $('#tweet-counter').addClass('negative');
    }
  });
});