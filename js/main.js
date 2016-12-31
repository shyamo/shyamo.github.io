var app = {
    init: function() {
        //app.tileHeight();
        //app.resize();
    },
    
    tileHeight: function() {
        var maxHeight =0;
        $('.project-title').each(function() {
            if ( $(this).outerHeight() > maxHeight ) {
                maxHeight = $(this).outerHeight();
            }
        });
        //set all heights the same
        $('.project-title').height(maxHeight) ;
    },
    
    resize: function () {
        $(window).resize(function() {
            app.tileHeight();
        });
    }
}

$(document).ready(function() {
    app.init();
});
