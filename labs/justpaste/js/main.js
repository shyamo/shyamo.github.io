/*Copywright (c) Shyam B*/
var app = angular.module('myApp', []);
app.controller('myController', function($scope, $rootScope) {
  var baseColor = '#F0F0F0',
    tempColor;

  $rootScope.data = [
    {item:"this is an example of text pasted onto this webpage. Click me to copy text to clipboard.", color: baseColor},
  ]

  $("body").bind('paste', function(e) {
    $('.paste-example, .msg').hide();
    tempColor = baseColor;
    if (!$('.paste-example').css('display') == 'none') {$('.paste-example').hide()};
    var clipboardItem = e.originalEvent.clipboardData ? e.originalEvent.clipboardData.getData("text/plain") : window.clipboardData.getData("text");
    var isHexCode  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(clipboardItem);
    if (isHexCode==true){
      tempColor=clipboardItem;
    } else {
      tempColor=baseColor;
    };
    $rootScope.data.push({'item': clipboardItem, 'color':tempColor});
    $rootScope.$apply()
  });

    $scope.copyItem = function($event) {
      $('.msg').hide();
      var clickedElem = $($event.currentTarget).attr("id");
      var textareaVal = $('#' + clickedElem +' .paste-box-item').text();
      $('#textarea1').text(textareaVal);

      $('#' + clickedElem +' .msg').fadeIn(600);
      var copyTextarea = document.querySelector('#textarea1');
      copyTextarea.select();
      try {
        var found = document.execCommand('copy');
      } catch (err) {

      }
    }
});
