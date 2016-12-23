var app = {
  init: function() {
    app.keyEvents();
    app.events();
  },

  events: function() {
    $('.text').focus();

    $('.search').on('click', function() {
        $('.load').hide();
        app.callApi($('.text').val());
    });

    $('#show-map').on('click', function(){
        app.updateMap();
    });

    $(".js-dentist a.link-list").on('click', function(){
      console.log(1);
      $("html, body").animate({ scrollTop: $(document).height() }, "fast");
    });

  },

    updateMap: function(addressName, array) {
        var labelIndex = 0;
        var centerPin = {lat:0, lng:0};
        var mapOptions = {
	         center: { lat: 55.3781, lng: 3.4360 },
	         zoom: 16
	      };
        var geocoder = new google.maps.Geocoder();

       geocoder.geocode({
          'address': addressName
       },

       function(results, status) {
          if(status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map
             });
             map.setCenter(results[0].geometry.location);
          }
       });

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    },

  keyEvents: function() {
    $('.text').keypress(function (e) {
     var key = e.which;
     if(key == 13) { // the enter key code
        $('input[name = search]').click();
        return false;
      }
    });
  },

  callApi: function(postcode) {
      var myjson;
      $.getJSON("http://data.gov.uk/data/api/service/health/dental_practices/partial_postcode?partial_postcode="+ postcode +"&callback=?", function(json){
          myjson = json;
          var count = Object.keys(json).length, //count items in document
          card = "",
          endCard = "</div></a><!--/js-card--></a></div><!--/col-md-4-->",
          googleMaps = "https://www.google.co.uk/maps/place/",
          simpleAddress = "";

          for ( var j = 0; j < 5; j++ ) {
            try {
              googleMapsAddress = myjson.result[j].address_line_2 + " " + myjson.result[j].postcode;
              simpleAddress = googleMapsAddress;
              googleMapsAddress = googleMapsAddress.split(' ').join('+').toLowerCase();
              card += "<div class='col-md-12'><a href='#' id='link"+ j +"' class='btn-viewonmap link-list "
              if (j==0) { card += " active" };
              card += "' data-address='"+ googleMapsAddress +"'><div class='js-card'>";
              card += "<div class='name'>"+ app.capitalize(myjson.result[j].name) +"</div>";
              if (myjson.result[j].address_line_2) card += "<div class='contact address_line_2'>"+ app.capitalize(myjson.result[j].address_line_2) +"";
              card += "<div class='contact postcode'>"+ myjson.result[j].postcode +"</div></div>";
              card += endCard;
            }catch(e) {
              console.log('Error:',e);
            }

          $('.js-dentist').html(card); //writes html to container

          if (j==0) {
            app.updateMap(myjson.result[0].address_line_2 + " " + myjson.result[0].postcode, 0);
          }

          var source   = $("#entry-template").html();
          var template = Handlebars.compile(source);

        } //end of for loop

          $('.btn-viewonmap').on('click', function(e){
            e.preventDefault();
            app.updateMap($(this).data('address'), j);
            $('.link-list').removeClass('active');
            $(this).addClass('active');
          });
      });
  },
  
  capitalize:function(string) {
      string = string.toLowerCase();
      return string;
  }
}

$(document).ready(function() {
   app.init();
});
