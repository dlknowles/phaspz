'use strict';

var Tile = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'tiles', frame);

  // initialize your prefab here
  this.levelSettings = this.game.currentLevel.settings;
  this.inputEnabled = true;
  this.events.onInputDown.add(this.clickListener, this);
};

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;

Tile.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Tile.prototype.clickListener = function() {
  // console.log('you clicked me!!');
  this.incrementTile();
};

Tile.prototype.incrementTile = function() {
  //console.log('incrementing tile...');
  
  if (this.frame >= this.levelSettings.numTiles - 1) {
    this.frame = 0;
  } else {
    ++this.frame;
  }
};

module.exports = Tile;
