/* Watch */
/* Copyright 2016 Shyam B */
var watch = {
  
    variables:  {
      degSecond :   0 ,
      degMinute:    0 ,
      degHour:      0,
      degHourHalf: false,
    },
    
    
    //move hour by half, indicates that its moving towards next hour instead of showing current hour
    checkHourHand: function(minuteHand, hourHand) {
        
        //var moveMin = watch.variables.degMinute;
        var halfHour;
        if (minuteHand == 180) {
              //move hour hand by half
            watch.variables.degHourHalf = true;
          } else if (minuteHand == 0) {
              watch.variables.degHourHalf = false;
          }
        
        
        if (watch.variables.degHourHalf == true) {
            watch.variables.degHour = watch.variables.degHour + 15;
        } else {
            watch.variables.degHour = (watch.variables.degHour - 15) + 30;
        }
        
        $(".hour").css({
                'transform':            'rotate(' + (halfHour) +'deg)',
                '-moz-transform':       'rotate(' + (halfHour) +'deg)',
                '-o-transform':         'rotate(' + (halfHour) +'deg)',
                '-webkit-transform':    'rotate(' + (halfHour) +'deg)'
            });
        
        
    },
    
  rotateSecond : function() {
      //watch.getCurrentTime();
      var nSec, 
          nMin, 
          nHr,
          moveMin = false,
          moveHr = false;
      
      watch.variables.degSecond+=6; // 360/60 seconds
      if (watch.variables.degSecond > 354) {
          watch.variables.degSecond = 0;
          moveMin = true;
      } 
      nSec = watch.variables.degSecond;
      
        $(".second").css({
            'transform':            'rotate(' + (nSec) +'deg)',
            '-moz-transform':       'rotate(' + (nSec) +'deg)',
            '-o-transform':         'rotate(' + (nSec) +'deg)',
            '-webkit-transform':    'rotate(' + (nSec) +'deg)'
        }); 
      
      //move minute hand
      if (moveMin == true){
          watch.variables.degMinute+=6; // 360/60 seconds
          if (watch.variables.degMinute > 354) {
              watch.variables.degMinute = 0;
              moveHr = true;
          } 
            nMin=watch.variables.degMinute;
          
          //if minute hand > 180 then move hour hand 15 (1/2 of 30)
          if(nMin >= 180) {
              //console.log(nMin)
              nHr+=15;
          }
          

            $(".minute").css({
                'transform':            'rotate(' + (nMin) +'deg)',
                '-moz-transform':       'rotate(' + (nMin) +'deg)',
                '-o-transform':         'rotate(' + (nMin) +'deg)',
                '-webkit-transform':    'rotate(' + (nMin) +'deg)'
            }); 
          moveMin = false;
          
          if (moveMin == 180 || moveMin ==0) {
              //watch.checkHourHand(moveMin, moveHr);
          }
      }
      
      //move hour hand
      if (moveHr == true){
          watch.variables.degHour+=30; // 360/60 seconds
          if (watch.variables.degHour > 354) {
              watch.variables.degHour = 0;
          }
            nHr=watch.variables.degHour;
          
            $(".hour").css({
                'transform':            'rotate(' + (nHr) +'deg)',
                '-moz-transform':       'rotate(' + (nHr) +'deg)',
                '-o-transform':         'rotate(' + (nHr) +'deg)',
                '-webkit-transform':    'rotate(' + (nHr) +'deg)'
            }); 
          moveHr = false;
      }

  },

    rotateMinute : function() {
        var nMin;
        if (watch.variables.degMinute > 354) {
            watch.variables.degMinute = 0
        } else {
             watch.variables.degMinute+=6; // 360/60 seconds
        }
        nMin=watch.variables.degMinute;
        
        $(".minute").css({
            'transform':            'rotate(' + (nMin) +'deg)',
            '-moz-transform':       'rotate(' + (nMin) +'deg)',
            '-o-transform':         'rotate(' + (nMin) +'deg)',
            '-webkit-transform':    'rotate(' + (nMin) +'deg)'
        }); 
  },
    
    rotateHour : function(currentHour) {
        var nHr;
        //console.log(watch.variables.degHour);
        if (watch.variables.degHour > 354) {
            //console.log('1')
            watch.variables.degHour = 0
        } else {
            //console.log('2')
            //watch.variables.degHour+=30; // 360/12 hours
        }
        nHr=watch.variables.degHour;
        //console.log(nHr);
        $(".hour").css({
            'transform':            'rotate(' + (nHr) +'deg)',
            '-moz-transform':       'rotate(' + (nHr) +'deg)',
            '-o-transform':         'rotate(' + (nHr) +'deg)',
            '-webkit-transform':    'rotate(' + (nHr) +'deg)'
        }); 
  },
    
    getCurrentTime: function() {
      var d = new Date();
        watch.variables.degSecond = (d.getSeconds() * 6 );
        watch.variables.degMinute = (d.getMinutes() * 6 );
        watch.variables.degHour =   (((d.getHours() +24) % 12 || 12) * (30));  // 360 / 12 hours 
        watch.rotateSecond();
        watch.rotateMinute();
        watch.rotateHour(watch.variables.degHour);
    },
    
  init: function() {
    watch.getCurrentTime();
    window.setInterval(watch.rotateSecond, 1000 );
    }
};

$(document).ready(function() {
    watch.init();
});