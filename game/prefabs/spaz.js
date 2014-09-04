'use strict';

var Spaz = function(game, tile, type) { // , x, y, frame, tile) {
  if (!tile) {
    return null;
  }
  
  if (isNaN(type)) {
    return null;
  }
  
  this.game = game;
  type = parseInt(type, 10) || 0;
    
  var frames = this.getSpazFrames(type);
  
  Phaser.Sprite.call(this, game, tile.x, tile.y, 'sprites', frames[0]);

  // initialize your prefab here
  this.currentTile = tile;
  this.x = tile.x;
  this.y = tile.y;
  this.type = type;
};

Spaz.prototype = Object.create(Phaser.Sprite.prototype);
Spaz.prototype.constructor = Spaz;

Spaz.prototype.update = function() {
  
  switch(this.type) {
    case Spaz.Types.Blocker:
      this.blockerUpdate();
      break;
    case Spaz.Types.Changer:
      this.changerUpdate();
      break;
    case Spaz.Types.Waller:
      this.wallerUpdate();
      break;
    case Spaz.Types.GroundPounder:
      this.groundPounderUpdate();
      break;
    case Spaz.Types.Lobber:
      this.lobberUpdate();
      break;
    case Spaz.Types.Splitter:
      this.splitterUpdate();
      break;
    default:
      // do nothing
      break;
  };
};

Spaz.prototype.blockerUpdate = function() {
  
  
};

Spaz.prototype.changerUpdate = function() {
  
};

Spaz.prototype.wallerUpdate = function() {
  
};

Spaz.prototype.groundPounderUpdate = function() {
  
};

Spaz.prototype.lobberUpdate = function() {
  
};

Spaz.prototype.splitterUpdate = function() {
  
};

Spaz.prototype.getSpazFrames = function(type) {
  switch(type) {
    case Spaz.Types.Blocker:
      return this.game.globals.SpazBlockerFrames;
      break;
    case Spaz.Types.Changer:
      return this.game.globals.SpazChangerFrames;
      break;
    case Spaz.Types.Waller:
      return this.game.globals.SpazWallerFrames;
      break;
    case Spaz.Types.GroundPounder:
      return this.game.globals.SpazGroundPounderFrames;
      break;
    case Spaz.Types.Lobber:
      return this.game.globals.SpazLobberFrames;
      break;
    case Spaz.Types.Splitter:
      return this.game.globals.SpazSplitterFrames;
      break;
    default:
      return null;
      break;
  }
};

Spaz.Types = {
  Blocker: 1,
  Changer: 2,
  Waller: 3,
  GroundPounder: 4,
  Lobber: 5,
  Splitter: 6
};

module.exports = Spaz;
