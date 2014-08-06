
  'use strict';
  
  var Tile = require('../prefabs/tile');
  
  function Play() {}
  Play.prototype = {
    settings: null,
    tiles: null,
    create: function() {
//      this.game.physics.startSystem(Phaser.Physics.ARCADE);
//      this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
//      this.sprite.inputEnabled = true;
//      
//      this.game.physics.arcade.enable(this.sprite);
//      this.sprite.body.collideWorldBounds = true;
//      this.sprite.body.bounce.setTo(1,1);
//      this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
//      this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);
//
//      this.sprite.events.onInputDown.add(this.clickListener, this);
      this.settings = this.game.settings;
      this.initLevel();
    },
    update: function() {

    },
    clickListener: function() {
//      this.game.state.start('gameover');
    },
    initLevel: function(callback) {
      this.setupBoard();
      
      if (callback) {
        callback();
      }
    },
    setupBoard: function() {
      this.tile = new Tile(this.game, this.settings.boardPosX, this.settings.boardPosY);
      this.game.add.existing(this.tile);
      
      var xPos = 0,
          yPos = 0;

      this.tiles = this.game.add.group();
      for (var y = 0; y < this.settings.numRows; ++y) {
        yPos = y * this.settings.tileSize + this.settings.boardPosY;

        for (var x = 0; x < this.settings.numCols; ++x) {
          xPos = x * this.settings.tileSize + this.settings.boardPosX;

          var tile = new Tile(this.game, xPos, yPos); //, getRandomTileIndex());
          this.game.add.existing(tile);
        }
      }
    }
  };
  
  module.exports = Play;