

$(document).ready(function () {
  //console.log(this);
  $('#tweet-text').keydown(function () {
  console.log($(this)[0].textLength);
    ($(this).next().find('.counter')[0]['innerText'] = 140 - Number($(this)[0].textLength));
  });
  //$('#tweet-text')
});
