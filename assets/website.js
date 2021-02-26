function Tile( element ){
    
    var tile = element;

    var idleCss = "perspective( 800px ) rotateX( 0deg ) rotateY( 0deg ) translateZ( 0px )";

    var initialize = function() {

        tile.style.outline = "1px solid transparent";

        tile.addEventListener('mousedown', MouseDown, false);
        
    }


    var pushTile = function( x, y ){

        var width = tile.offsetWidth;
        var height = tile.offsetHeight;

        var translateString = "perspective( 800px ) ";

        if ( x > width/4 && x < (width/4 * 3) && y > height/4 && y < (height/4 * 3) ) {

            translateString += "rotateX( 0deg ) rotateY( 0deg ) translateZ( -30px )";
        }
        else {

            if ( y < height - y ) {

                translateString += "rotateX( 20deg ) rotateY( 0deg ) translateZ( 0px )";
            } else {

                translateString += "rotateX( -20deg ) rotateY( 0deg ) translateZ( 0px )";
            }
        }

        tile.style.MozTransform = translateString;
        tile.style.transform = translateString;

        document.addEventListener('mouseup',   MouseUp,   false);    

    };
    
    var MouseDown = function( event ){

        if ( event.offsetX ) {
            pushTile( event.offsetX, event.offsetY );
            return;
        }
        
        var tilePosition = elementPosition( tile );
        var x = event.pageX - tilePosition.x;
        var y = event.pageY - tilePosition.y;
        
        pushTile( x, y );
        
    };
    

    var MouseUp = function( event ){

        tile.style.MozTransform = idleCss;
        tile.style.transform = idleCss;

        document.removeEventListener('mouseup',   MouseUp,   false);
    };
    var getNumericStyleProperty = function(style, prop){
        return parseInt(style.getPropertyValue(prop),10) ;
    }
    initialize();
}

var tileElements = document.getElementsByClassName( 'button' );
var i;

for ( i = 0; i < tileElements.length; i++ ) {

    Tile( tileElements[i] );

}