
//tracks the number of characters left to type from the 140 limit and stores it.
$(document).ready(function() {

  $('#tweet-text').on('input',function(e) {
    ($(this).next().find('.counter')[0]['innerText'] = 140 - Number($(this)[0].textLength));
    let $charactersLeft = 140 - Number($(this)[0].textLength);

    //turns counter red once 140 characters limit is exceeded
    if ($charactersLeft < 0) {
      $(".counter").css('color', 'red');
    } else {
      $(".counter").css('color', '#666');
    };
  });
});
