 /* ET goes home */
 /* Copyright 2015 Shyam B */
var game = {
    
    settings: {
        seperator:      50,
        maxX :          450,
        maxY :          450,
        roundTop:       0,
        roundLeft:      0,
        skeyLeft:       37,
        skeyUp:         38,
        skeyRight:      39,
        skeyDown:       40,
        speed:          3000,
        speedInterval:  1000,
        maxBlockHeight: 400,
        levelCounter:   1,
        levelUp:        false,
        collision:      false,
        score:          0,
        stopGame:       false,
    },
    
    init: function() {
        console.log('//game initialized//');
        game.events();
        game.setup();
        game.generateBlocks();
    },
    
    setup: function() {
        //get position of box
        var leftBox = $('.box');
        var offsetLeftBox = leftBox.offset()
        
        $('.box-left').width(offsetLeftBox.left);
        $('.reset').hide();
        
    },

    play: function() {
        $('.play, .instructions').hide();
        $('.reset').show();
        $(document).focus();
        game.playInterval(game.settings.speedInterval);
        
    },
    
    playInterval: function(intervalSpeed) {
        window.setInterval(game.animateWall, intervalSpeed)
    },
    
    animateWall: function() {
        //console.log(game.settings.levelCounter);
        game.collisionCheck();
        $('.wall').animate({marginLeft:"-500"},
                           {duration: game.settings.speed,
                                complete: function() {
                                    game.generateBlocks();
                                    $('.wall').css({"margin-left":"500px"})
                                },
                                step: function() {
                                    game.collisionCheck();
                                    return;
                               }
                           });
        game.settings.levelCounter++
    },
    
    collisionCheck: function() {
        if (game.settings.collision == true) {game.stopAnimation();}
            var pTop = $( ".wall-top" );
            var offsetTop = pTop.offset();
        
            var pBottom = $( ".wall-bottom" );
            var offsetBot = pBottom.offset();
        
            var pBird = $(".mg" );
            var offsetBird = pBird.offset();
        
            var birdTop = offsetBird.top;
            var birdBottom = offsetBird.top +50;
            var birdRight = offsetBird.left + 50;
            var wallLeft = offsetTop.left;
            var wallTopHeight = offsetTop.top + $('.wall-top').height();
            var wallBottomTop = offsetBot.top;
    
            if ((birdRight >= wallLeft) && (birdRight -50 <= wallLeft + 100)) {
                //console.log('collision!')
                if (((birdTop) <= (wallTopHeight)) || ((birdBottom) > (wallBottomTop))) {
                    //console.log('collision!');
                    game.settings.collision = true;
                    $('.wall').clearQueue().stop();
                    game.settings.stopGame = true;
                }
            } else {
                game.settings.score++;
               if (game.settings.stopGame == false) { $('.score').text(game.settings.score); }
            }
            
    },
    
    stopAnimation: function() {
        $('.mg').clearQueue();
        $('.mg').clearQueue().stop();
    },
    
    closestPos: function() {
        var p = $('.mg');
        var offset = p.offset();
        game.settings.roundTop = Math.ceil(offset.top/50)*50;
        game.settings.roundLeft = Math.ceil(offset.left/50)*50;
        console.log('closestPos:' + game.settings.roundTop + '@' + game.settings.roundLeft);
    },
    
    generateBlocks: function() {
        var wallTop,
            wallBottom;
        
        wallTop = Math.ceil(Math.random()*400);
        wallBottom = game.settings.maxBlockHeight - wallTop;
        
        $('.wall-top').css({'height': wallTop});
        $('.wall-bottom').css({'height': wallBottom});
        
    },
    
    //keypress events - up,down,left,right
    events: function() {
        $(document).on('keydown', function(e) { 
            switch (e.keyCode) {
                case game.settings.skeyUp:
                    game.stopAnimation();
                    if (game.settings.collision == false) {
                        $('.mg').animate({'marginTop': 0} );
                        $('.mg').removeClass("animatedown animateleft animateright");
                        $('.mg').addClass('animateup');
                    }
                    
                    break;
                case game.settings.skeyDown:
                    game.stopAnimation();
                    //game.closestPos();
                    if (game.settings.collision == false) {
                        $('.mg').animate({'marginTop': game.settings.maxY} );
                        $('.mg').removeClass("animateup animateleft animateright");
                        $('.mg').addClass("animatedown");
                    }
                    
                    break;
            }
        });
        
        $(document).on('keyup', function(e) { 
            game.stopAnimation();
        });
        $('.play').on('click', function() {
           game.play(); 
        });
        $('.reset').on('click', function() {
           location.reload();
        });
        
    }
    
}

$(document).ready(function() {
   game.init(); 
});
