
/**
 * Module dependencies
 */

var domify = require( 'domify' )
  , classes = require('classes')
  , has3d = require('has-translate3d')
  , each = require('each')
  , transformProperty = require( 'transform-property' );

/**
 * Expose `MinimalCounter`
 */

module.exports = MinimalCounter;

/**
 *
 */

function MinimalCounter( value ){

  var self   = this;

  this.intervals = [];
  this.prevShifts = [];

  this.el    = domify( '<div class="minimal-counter"/>' );
  this.value = value || 100;
  this.value.toString().split('').forEach( self.addDigit.bind( this ) );
  this.update( this.value );
}

MinimalCounter.prototype.addDigit = function() {

  var digit    = domify( '<div class="digit"/>' ),
      sequence = domify( '<div class="sequence">'
                        + [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].join('\n')
                        + '</div>' );
  digit.appendChild( sequence );
  this.el.appendChild( digit );
};

MinimalCounter.prototype.update = function( number ) {

  var self          = this,
      digits        = number.toString().split('').reverse(),
      digitElements = this.el.children,
      diff          = digitElements.length - digits.length;

  if( diff < 0 ){
    while ( diff++ ){ this.addDigit(); }
    digitElements = this.el.children;
  } else {
    while ( diff-- ){ digits.push( -1 ); }
  }

  for ( var index = 0; index < digits.length; index += 1 ) {
    var num            = digits[index],
        shift          = - ( 9 - parseInt( num, 10 ) ) * 10,
        elIndex        = digitElements.length - index - 1,
        element        = digitElements[elIndex].children[0],
        translateValue = has3d ? "translate3d(0, " + shift + "%, 0)" : "translate(0, " + shift + "%)";


    if( num === -1 ){
      classes( element ).add( 'is-hidden' );
    } else {
      classes( element ).remove( 'is-hidden' );
      if (transformProperty) {
        this.setTransform(element, translateValue);
      } else {
        this.animate(element, this.prevShifts[index], shift, index);
      }
    }
    this.prevShifts[index] = shift;
  }
};

MinimalCounter.prototype.setTransform = function( element, translateValue ) {
  element.style[transformProperty] = translateValue;
};

/*
 * This should animate from previous
 */
MinimalCounter.prototype.animate = function(element, prevShiftY, shiftY, index) {
  // TODO
  //
};
