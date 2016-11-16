var app = {
  init: function() {
    app.keyEvents();
    app.events();
  },

  data: {
    myArray: []
  },

  events: function() {
    $('.text').focus();
    $('.search').on('click', function() {
        app.replaceTemplate();
        app.callApi($('.text').val());
    });
  },

  keyEvents: function() {

    $('.text').keypress(function (e) {
     var key = e.which;
     if(key == 13)  // the enter key code
      {
        $('input[name = search]').click();
        return false;
      }
    });
  } ,

  replaceTemplate: function() {
    var reset = "<script id='flickr-template' type='text/x-handlebars-template'>" +
        "{{#items}}" +
          "<div class='col-md-3 js-box'>" +
            "<div class='js-card'>" +
              "<a target='_blank' class='js-card-link overlay' href='{{this.flickrImageHref}}'>" +
                "<div class='card-image' style='background-image:url({{this.imageUrl}}); height:{{imageHeight}}'></div>" +
              "</a>" +
            "</div>" +
          "</div>" +
        "{{/items}}" +
    "</script>";
    $('.js-container').html(reset);
  },

  callApi: function(strSearch) {

    var source = $("#flickr-template").html();
    var template = Handlebars.compile($.trim(source));

    var html = {
      items:[]
    };
    var objArray;

      var myjson,
      fullImage = '',
      viewportHeight = $( document ).height(),
      imageHeightVal = viewportHeight/4;
      $.getJSON('http://api.flickr.com/services/feeds/photos_public.gne?tags='+ $('.text').val() +'&tagmode=any&format=json&jsoncallback=?', function(json){
          myjson = json;
          var count = Object.keys(json).length, //count items in document
          card = "";

          for ( var j = 0; j < 16; j++ ) {
            try {
              fullImage = myjson.items[j].media.m.replace('_m.jpg','.jpg');
              html.items.push({id:j, flickrImageHref:myjson.items[j].link, imageUrl:fullImage, imageHeight:imageHeightVal});
            }catch(e) {
              console.log('Error:',e);
            }
            $('.text').css({'color':'#fff'});
            $('.flickr-logo, .msg').hide();
          }
          $('.js-container').html(template(html));
      });

  }
};



$(document).ready(function() {
   app.init();
});
