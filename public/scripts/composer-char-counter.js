

$(document).ready(function () {
  $('#tweet-text').keydown(function(e) {
    //console.log($(this)[0].textLength);
    
    ($(this).next().find('.counter')[0]['innerText'] = 140 - Number($(this)[0].textLength));
    let $charactersLeft = 140 - Number($(this)[0].textLength);
    // $text = $(this).val();

    // if ($charactersLeft < 0) {
    //   $counter.addClass("fontRed");
    // } else {
    //   $counter.removeClass("fontRed");
    // }
  });
});
