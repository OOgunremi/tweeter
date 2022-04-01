
//tracks the number of characters left to type from the 140 limit and stores it.
$(document).ready(function () {
  $('#tweet-text').keypress(function(e) {
    
    ($(this).next().find('.counter')[0]['innerText'] = 139 - Number($(this)[0].textLength));
    let $charactersLeft = 139 - Number($(this)[0].textLength);

    //turns counter red once 140 characters limit is exceeded
    if ($charactersLeft < -1) {
      $(".counter").css('color', 'red');
    }
  });
});
