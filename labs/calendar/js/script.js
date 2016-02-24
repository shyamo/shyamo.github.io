/* Calendar */
/* Copyright 2016 Shyam B */
var app = angular.module('myApp', ['ngSanitize']);
    app.controller('myController', function($scope, $http) {
        
        var d = new Date();
        var n = d.getDate('d');
        var daydiv = "#day";
          
        $scope.data = [ 
            {day:"1",   src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=yS55oeuy-X0'}, 
            {day:"2",   src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=oBROp1UmpbQ'}, 
            {day:"3",   src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=L0CL__Tvp-o'}, 
            {day:"4",   src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=0c4hV7Mqxpw'}, 
            {day:"5",   src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=-EYe8J9FMkI'}, 
            {day:"6",   src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=Vd7XO18qxJg'}, 
            {day:"7",  src:"images/insta.png",    anchor:'https://www.instagram.com/p/-ywVZow2Vc/'}, 
            {day:"8",   src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=anf2qEjec3U'}, 
            {day:"9",   src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=Pi26jOK9YW8'}, 
            {day:"10",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=GxFPwKEBmxI'}, 
            {day:"11",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=JnszgkE3O8g'}, 
            {day:"12",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=6XSEi1jTR58'}, 
            {day:"13",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=bUubgv3_ps0'}, 
            {day:"14",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=Pre3Yi-6uTw'}, 
            {day:"15",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=NXC5EVEpqsk'}, 
            {day:"16",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=l4D5zScOFKU'}, 
            {day:"17",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=6PKQE8FM2Uw'}, 
            {day:"18",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=AnXh3XR9zyM'}, 
            {day:"19",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=1-_jEx0Bk58'}, 
            {day:"20",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=TruXhuAO4IY'}, 
            {day:"21",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=Ff6bi8rkLpg'}, 
            {day:"22",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=lSMTVZ58fvc'}, 
            {day:"23",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=xkxbJtQ3dk0'}, 
            {day:"24",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=FArZxLj6DLk'}, 
            {day:"25",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=fs0FYyzkgT4'},
            {day:"26",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=fDYptU_Lv1I'}, 
            {day:"27",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=qkBx0gMGuhY'}, 
            {day:"28",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=nTh9qpzhunE'}, 
            {day:"29",  src:"images/insta.png",    anchor:'https://www.instagram.com/p/-tfF5Ow2Uu/'}, 
            {day:"30",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=uRGaIK51LWc'}, 
            {day:"31",  src:"images/yt.png",    anchor:'https://www.youtube.com/watch?v=rVcTPfBxOPU'} 
        ]
        
        $scope.ocode = function(event) {
            //console.log(element);
            var divParent = $(event.target).parents('.door').attr("id");
            $('.door').removeClass("opendoor"); //close all open doors
            $('.cloned').remove(); //remove any clones
            $('.cloned img').css({'display':'none'});
            $(event.target).parents('.door').clone().addClass('cloned').insertAfter('#' +divParent); //create clone with clone class
            $('.cloned span').remove(); //remove number in clone
            $(event.target).parents('.door').addClass("opendoor"); //open door            
            $('.cloned').find("img").delay(800).fadeIn(2000); //show item after door opens
        }
        
        $scope.openDoor = function(event) {
            var divParent = $(event.target).parents('.door').attr("id"); //find parent div of click event element
            var divNumber = 0;
            divNumber = divParent.substring(3, divParent.length);
            
            if ( divNumber == n  ) {
                $scope.ocode(event);
            } else if ( divNumber > n) {
                $scope.ocode(event);
                $(event.target).parents('.door').next().find("a").attr("href", "#").removeAttr("target");
                $(event.target).parents('.door').next().find("img").attr("src", "images/lock-pic.png");
            }     
        };
        
        $scope.dayOpen = function(event) {
            angular.element(document).ready(function () {
                for (i=1;i<32;i++) {    
                    if (i < n) {
                        $(daydiv + i).addClass('cloned-static').css({"margin-left":"0px"});
                        $(daydiv + i).removeAttr('ng-click');
                        $(daydiv + i).find('img').css({"display":"block"});
                        $(daydiv + i).find('span').css({"display":"none"});
                    }  else if ( i == n) {
                        $(daydiv + i).find('span').css({"color":"cc181e"});
                    }
                }
            })
        };
        
        $scope.msgData = function() {
            var sHtml = "Yo B*%$*! Click the right day.";
            return sHtml;
        };
        
        $scope.msg = function(event) {
            //$('.msg').show().delay(1000).fadeOut(1000);
            var rootDiv = $(event.target).parents('.door').attr("id"); //find parent div of click event element
            $(rootDiv).find("img").attr("href", "#");
            $(rootDiv).find("img").attr("src", "../images/lock-pic.png") 
            
        };
        
        
        
    });