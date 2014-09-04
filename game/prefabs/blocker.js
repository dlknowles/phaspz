'use strict';

var Blocker = function(game, tile) { // , x, y, frame, tile) {
  if (!tile) {
    return null;
  }
  
  
  //Phaser.Sprite.call(this, game, tile.x, tile.y, 'player', frame);

  // initialize your prefab here
  this.currentTile = tile;
  this.x = tile.x;
  this.y = tile.y;
};

Blocker.prototype = Object.create(Phaser.Sprite.prototype);
Blocker.prototype.constructor = Blocker;

Blocker.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Blocker;
