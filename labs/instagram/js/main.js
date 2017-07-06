var init = {
  load: function() {
    console.log('//initialised//');
    init.instagramToken();
  },
  instagramToken: function() {
    var tkn = '4159955259.cb4eec9.334f6ed5da8843f9833174c0991d58b5',
      url = 'https://api.instagram.com/v1/users/self/media/liked?access_token='+ tkn +'&count=5&callback=?'
    $.getJSON(url, function(json){
          dataType: 'json'
          console.log(url, json.data);
    });
  }
}
$(document).ready(function() {
  init.load();
});
