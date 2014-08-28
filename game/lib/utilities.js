'use strict';

var Utilities = function () {
  this.getRandomTile = function(numTiles) {
    var max = (numTiles - 1) || 0;
    
    if (isNaN(max) || max < 0) {
      max = 0;
    }
    
    return Math.floor(Math.random() * (max + 1));
  };
  
  this.getRandomInt = function(max) {
    // return Math.floor(Math.random() * (max - min + 1) + min);
    return Math.floor(Math.random() * (max + 1));
  };
};

module.exports = Utilities;