'use strict';

var Tile = function(game, x, y, frame) {
  this.game = game;
  this.levelSettings = this.game.currentLevel.settings;
  
  if (isNaN(frame)) {
    frame = -1;
  }
  
  if (frame < 0) {
    frame = this.getRandomTile();
  }
  
  Phaser.Sprite.call(this, game, x, y, 'sprites', frame);
};

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;

Tile.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Tile.prototype.clickListener = function() {
  console.log(this);
  this.incrementTile();
};

Tile.prototype.getRandomTile = function() {
  var result = 0,
      numTiles = this.levelSettings.numTiles,
      startTile = this.game.globals.TileFrames[0];
        
  numTiles = (numTiles > this.game.globals.TileFrames.length) ? this.game.globals.TileFrames.length : numTiles;
  
  result = this.game.utilities.getRandomInt(startTile, (startTile + numTiles - 1));
  
  return result;  
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
