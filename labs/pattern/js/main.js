var game = {
    
    settings: {
        pattern: [],
        patternCopy: [],
        patternShow: [],
        patternCount: 3,
        boxCount: 36,
        delay: 0,
        delayMeasure: 1500,
        countCorrect: 0
    },
    
    init: function() {
        console.log('//game initialized//');
        game.events();
        game.setup();
        game.play();
    },
    
    setup: function() {
        var templateRow = "<div class='row'>";
        var counter = 1;
        for (i=0; i<6; i++) {
            for (j=0; j<6; j++) {
                if (j==0) {$('.container').append(templateRow);};
                $('.container').append("<div class='box box-"+ counter +"' data-box='"+ counter +"'><div class='sel'><span></span></div></div>");
                if (j==3) {$('.container').append("</div>");};
                counter++;
            };
        };
        
        game.setPattern();
    },
        
    play: function() {
        //clear all open patterns
        $('.no-click').show();
        
        game.settings.delay = 0;
        $('.box div').css({"opacity":"0", "display":"block"}).removeClass("correct");
        for (i=0; i<game.settings.pattern.length; i++) {   
            
            $('.box-'+ game.settings.pattern[i] + ' div').delay(game.settings.delay).animate({"opacity":"1"},game.settings.delayMeasure ,function() {
                //$('.box div').fadeOut();
            });
            
            $('.box-'+ game.settings.pattern[i] + ' div span').empty().append(i+1);
            game.settings.delay+= game.settings.delayMeasure;
        }
        
            setTimeout(function() {
                $('.box div').fadeOut();
            },game.settings.delay)
        
            $('.no-click').hide();
    },
    events: function() {   
        $(event.target).on('click', function(e) {
            if ($(event.target).hasClass('box')){
                game.checkOrder(event.target);  //check if click is in order
            } 
        });
    },
    
    checkOrder: function(event) {
        var boxNumber = $(event).attr("data-box");
        if (boxNumber == game.settings.pattern[0]) {
            
            game.settings.pattern.splice(0, 1);
            $('.box-' + boxNumber + " div").addClass('correct').fadeIn();

            game.settings.countCorrect++;
            
            $('.stats span, .copy span').empty().append(game.settings.countCorrect);
            
            if (game.settings.pattern.length ==0){
                game.settings.patternCount++;
                game.setPattern();
                //$('.box-' + boxNumber + " div").delay(1000).fadeOut();
                //$('.box div').delay(1000).css({"opacity":"0", "display":"none"});
                
                setTimeout(function() {
                    game.play();
                },3000);
                
            }
            
        } else {
            //not found in correct order
            $('.box-' + boxNumber + " div").css({"opacity":"1"}).fadeIn();
            $('.block, .block-text').show();
            //show all correct patterns
            for (i=0; i<game.settings.patternCopy.length; i++) {
                $('.box-'+ game.settings.patternCopy[i] + ' div').addClass('correct').show();
            }
        }
        
    },
    
    wait: function() {
        
    },
    randomNumber: function(boxCount) {
        var temp = Math.floor((Math.random() * (boxCount)) + 1);
        //check if value already exists in array otherwise get another value
        while ($.inArray(temp, game.settings.pattern) != -1) {
            temp = Math.floor(Math.random() * (boxCount));
        }
        return temp
    },
    
    setPattern: function() {
       var val; 
        for (i=0; i<game.settings.patternCount; i++){
            val = game.randomNumber(game.settings.boxCount); 
            game.settings.pattern.push(val);
            //clone pattern
            game.settings.patternCopy = game.settings.pattern.slice(0);
        } 
    }
    
}

$(document).ready(function() {
   game.init(); 
});
