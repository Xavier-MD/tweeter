$(document).ready(function() {
  $('section.new-tweet form textarea').keyup(function() {
    const $charCounter = $(this).siblings('section.new-tweet form div').children('section.new-tweet form div output');
    const $textCount = 140 - $(this).val().length;
    $charCounter.text($textCount);
    if ($textCount < 0) {
      $charCounter.addClass('negative');
    } else {
      $charCounter.removeClass('negative');
    }
  });
});