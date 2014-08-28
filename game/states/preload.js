
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    var settings = this.game.settings;
    
    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.spritesheet('tiles', 'assets/sprites/tilesandobjects' + settings.tileSize + '.png', settings.tileSize, settings.tileSize);
    this.load.spritesheet('player', 'assets/sprites/player.png', settings.tileSize, settings.tileSize);
    this.load.image('startButton', 'assets/sprites/start-button.png');
    this.load.image('quitButton', 'assets/sprites/quit-button.png');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
//      this.game.state.start('menu');
      this.game.state.start('play');  // skips the menu (for testing)
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
