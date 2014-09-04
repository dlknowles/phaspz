'use strict';

var Player = function(game, tile) { // , x, y, frame, tile) {
  if (!tile) {
    return null;
  }
  
  Phaser.Sprite.call(this, game, tile.x, tile.y, 'sprites', game.globals.PlayerFrames[0]);

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

Player.prototype.move = function(newTile) {
  if (newTile) { // && newTile has no obstructions) {
  
    this.currentTile = newTile;
    this.x = newTile.x;
    this.y = newTile.y;
  
  }
};

module.exports = Player;
