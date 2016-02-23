/* Hangman! */
/* Copyright 2016 Shyam B */
var game = {
    
    settings: {
        wordRepo: ['github','abruptly','croquet','glowworm','jawbreaker','jiujitsu','oxidize','schizophrenia','xylophone','microwave','pneumonia','megahertz','hyphen','galvanize','askew','fuchsia','phlegm', 'snap','flummox', 'zebra', 'window', 'sydney', 'washington', 'mayanmar', 'greece', 'orange', 'wednesday', 'formula', 'columbia', 'fever', 'weather', 'guardian', 'mediterranean', 'jinx', 'rhythm'],
        wordSelect: '',
        wordLength: 0,
        colorGreen: '#35C448',
        colorRed: '#C43567',
        scoreWin: 20,
        scoreLoss: -10,
        scoreBonus: 50,
        totalScore: 0,
        letterFound : false,
        letterGuess: false,
        wordFound: false,
        wordGuess: false
        },
    
    init: function() {
        console.log('//game initialized//');
        game.events();
        game.setup();
        
    },
    
    events: function() {
        
        $('.btnadd').on('click', function() {
            game.addToDictionary();
        });
        $('.btnclear').on('click', function() {
            game.settings.wordRepo = ['realise','london'];
        });
        $('.btnplay').on('click', function() {
            game.play();
        });
        $('.btnguess').on('click', function() {
            game.guess();
        });
        $('.cog-cancel').on('click', function() {
            $('.settings').show();
        });
        $('.btnreset').on('click', function() {
            location.reload();
        });
        
        $('.txtguess').keydown(function (e) {
          var keyCode = e.keyCode || e.which;

        if (keyCode == 13 && $(".txtguess").is(":focus") ) {
            game.guess();
            return false;
        }
            
        });
        
    },
    
    resetGame: function() {
        
    },
    
    setup: function() {
        $('.guess-box, .settings, .scoreboard').hide();
    },
    
    guess: function() {
        game.settings.letterGuess = false;
        game.settings.wordGuess = false;
        game.settings.letterFound = false;
        game.settings.wordFound = false;
        
        var guessVal = $('.txtguess').val();
        var letterConcat = '';
        //letter guess
        if (guessVal.length == 1) {
                game.settings.letterGuess = true;
                game.settings.wordGuess = false;
            $('.letter').each(function() {
                if ($(this).text() === guessVal ) {  
                    if ($(this).css("opacity") != "1") {
                        $(this).animate({opacity:'1'});
                        //if the word is found:
                        game.settings.letterFound = true;
                    } 
                    
                }    
            });
            
        } else if (guessVal.length > 1) { //word guess
            
                game.settings.letterGuess = false;
                game.settings.wordGuess = true;
            
            $('.letter').each(function() {
                letterConcat += $(this).text();
            });
            if ( letterConcat === guessVal ) {
                $('.letter').animate({"opacity":'1'}, function() {
                    $(this).css({"color":game.settings.colorGreen});
                });
                game.settings.wordFound = true;
            } 
        }
        
        
        
        ////scoring
        if (game.settings.wordGuess == true) {
            if(game.settings.wordFound == true) {
                game.settings.totalScore += game.settings.scoreWin;
                game.settings.totalScore += game.settings.scoreBonus;
                                
            } else {
                game.settings.totalScore += game.settings.scoreLoss;
            }
            
            
            
            
        } else if (game.settings.letterGuess == true) {
            if(game.settings.letterFound == true) {
                game.settings.totalScore += game.settings.scoreWin;

            } else {

                game.settings.totalScore += game.settings.scoreLoss;
            }
        }
        
        //clear the guess input
        $('.txtguess').val('').focus();
        $('.score').text(game.settings.totalScore);
        
        
    },
    
    //shuffles items in the array
    shuffleWords: function(array) { 
            for (var i =0; i < array.length; i++) {
                var j = Math.floor(Math.random() * (array.length - i));
                var temp = array[j];
                array[j] = array[i];
                array[i] = temp;
            }
        return array
    },
    
    play: function() {
        game.settings.totalScore = 0;
        $('.score').text('0');
        $('.instructions').hide();
        $('.guess-box, .scoreboard').show();
        $('.txtguess').val('').focus();
        
        
        //$('.btnplay').hide();
        var dashHtml = '',
            dashWidth='',
            letter = '',
            tempWord = '',
            tempWordLoop = '';
        
        game.shuffleWords(game.settings.wordRepo); //shuffle words in array
        game.settings.wordSelect = game.settings.wordRepo[0]; //get 1st item word in array
        game.settings.wordLength = game.settings.wordSelect.length;
        tempWord = game.settings.wordSelect;
        tempWordLoop = game.settings.wordSelect;
        
        $(".txtguess").attr('maxlength',tempWord.length); // set max length on input to length of word
        
        
        for(var i=0;i<tempWord.length;i++) { 
            letter = tempWordLoop.substring(1,0); 
            dashHtml += "<span class='dashitem js-"+ i +"'><span class='letter'>"+ letter +"</span></span>";
            tempWordLoop = tempWord.slice((tempWord.length -(i+1))*(-1));
        }
        
        //for each letter in word
        dashWidth = (100/(game.settings.wordSelect.length*2));
        $('.word-box').html(dashHtml);
        $('.dashitem').css({"width":dashWidth +"%"});
        
    },
    
    addToDictionary : function() {
        
        var word = $('.txtrepo').val();
        game.settings.wordRepo.push(word);
        alert("'" + word + "' added to your dictionary!");
        //console.log(game.settings.wordRepo);
        
    }
}

$(document).ready(function() {
   game.init(); 
});
