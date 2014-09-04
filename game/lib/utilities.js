'use strict';

var Utilities = function () {
  this.getRandomTile = function(numTiles) {
    var max = (numTiles - 1) || 0;
    
    if (isNaN(max) || max < 0) {
      max = 0;
    }
    
    return Math.floor(Math.random() * (max + 1));
  };
  
  this.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
};

module.exports = Utilities;