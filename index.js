
/**
 * Module dependencies
 */

var domify = require( 'domify' );

/**
 * Expose `MinimalCounter`
 */

module.exports = MinimalCounter;

/**
 * 
 */

function MinimalCounter( value ){

  var self   = this;
  this.el    = domify( '<div class="minimal-counter"/>' )[0];
  this.value = value || 100;
  this.value.toString().split('').forEach( self.addDigit.bind( this ) );
  this.update( this.value );

}

MinimalCounter.prototype.addDigit = function() {

  var digit    = domify( '<div class="digit"/>' )[0],
      sequence = domify( '<div class="sequence">'
                        + [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].join('\n')
                        + '</div>' )[0];
  digit.appendChild( sequence );
  this.el.appendChild( digit );
};

MinimalCounter.prototype.update = function( number ) {

  var self          = this,
      digits        = number.toString().split('').reverse(),
      digitElements = this.el.querySelectorAll( '.sequence' ),
      diff          = digitElements.length - digits.length;
  
  if( diff < 0 ){
    //while ( diff++ ){ this.addDigit(); }
    digitElements = this.el.querySelectorAll( '.sequence' );
  } else {
    while ( diff-- ){ digits.push( -1 ); }
  }

  digits.forEach( function( num, index ){

    var shift     = - ( 9 - parseInt( num, 10 ) ) * 10,
        elIndex   = digitElements.length - index - 1,
        element   = digitElements[elIndex],
        translate = "translate3d(0, " + shift + "%, 0)";
    
    if( num === -1 ){
      element.classList.add( 'is-hidden' );
    } else {
      element.classList.remove( 'is-hidden' );
      self.setTransform( element, translate );
    }
  } );
};

var prefix = ['webkitTransform', 'mozTransform', 'msTransform', 'oTransform', 'transform'];

MinimalCounter.prototype.setTransform = function( element, translate ) {
  prefix.forEach( function( transform ){
    element.style[transform] = translate;
  } );
};
