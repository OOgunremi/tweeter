

$(document).ready(function () {
  $('#tweet-text').keypress(function(e) {
    console.log($(this)[0].textLength);
    
    ($(this).next().find('.counter')[0]['innerText'] = 139 - Number($(this)[0].textLength));
    let $charactersLeft = 139 - Number($(this)[0].textLength);


    if ($charactersLeft < -1) {
      $(".counter").css('color', 'red');
    }
  });
});
