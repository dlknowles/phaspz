'use strict';

var Player = function(game, x, y, frame, tile) {
  Phaser.Sprite.call(this, game, x, y, 'player', frame);

  // initialize your prefab here
  this.currentTile = tile;
  this.x = tile.x;
  this.y = tile.y;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Player;
