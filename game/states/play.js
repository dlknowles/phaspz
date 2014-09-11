
  'use strict';
  
  var Player = require('../prefabs/player'),
      Spaz = require('../prefabs/spaz'),
      Tile = require('../prefabs/tile');
  
  function Play() {}
  Play.prototype = {
    settings: null,
    tiles: null,
    create: function() {
      this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      
      this.game.input.onDown.add(this.clickListener, this);
      this.upKey.onDown.add(this.upKeyOnDown, this);
      this.downKey.onDown.add(this.downKeyOnDown, this);
      this.leftKey.onDown.add(this.leftKeyOnDown, this);
      this.rightKey.onDown.add(this.rightKeyOnDown, this);
      
  
      this.settings = this.game.settings;
      this.gameSettings = this.game.currentLevel.settings;
      this.utilities = this.game.utilities;
      
      this.initLevel();      
    },
    update: function() {
      // update player
      
      // update spazes
      
    },
    clickListener: function() {
      var inputX = this.game.input.x,
          inputY = this.game.input.y,
          selectedTile = this.getSelectedTile(inputX, inputY);
        
      // only do something here if the player clicked a tile. otherwise, he either clicked an input element or nothing
      if (selectedTile) {
        if (--this.numTurns > -1) {
          this.updateHud();
          selectedTile.incrementTile();
          // TODO: Update spaz actions
          
        }
      }
    },
    upKeyOnDown: function() {
      // check tile above player to make sure it exists and is not obstructed.
      var currentTileIndex = this.tiles.getIndex(this.player.currentTile),
          newTileIndex = currentTileIndex - this.settings.numCols;
      
      if (newTileIndex > -1) {
        var nextTile = this.tiles.getAt(newTileIndex);
        
        if (this.isValidMove(this.player.currentTile, nextTile)) {        
          this.player.move(nextTile);
          //console.log(currentTileIndex);
        } else {
          console.log("you can't move to a different color tile");
        }
      } else {
        console.log("you can't move that far up");
      }
    },
    downKeyOnDown: function() {
      // check tile below player to make sure it exists and is not obstructed.
      var currentTileIndex = this.tiles.getIndex(this.player.currentTile),
          newTileIndex = currentTileIndex + this.settings.numCols;
      
      if (newTileIndex < this.tiles.length) {
        var nextTile = this.tiles.getAt(newTileIndex);
        
        if (this.isValidMove(this.player.currentTile, nextTile)) {        
          this.player.move(nextTile);
          //console.log(currentTileIndex);
        } else {
          console.log("you can't move to a different color tile");
        }
      } else {
        console.log("you can't move that far down");
      }
    },
    leftKeyOnDown: function() {
      // check tile left of the player to make sure it exists and is not obstructed.
      var currentTileIndex = this.tiles.getIndex(this.player.currentTile);
      
      if ((currentTileIndex) % this.settings.numCols !== 0) {
        var nextTile = this.tiles.getAt(currentTileIndex - 1);
        
        if (this.isValidMove(this.player.currentTile, nextTile)) {        
          this.player.move(nextTile);
          //console.log(currentTileIndex);
        } else {
          console.log("you can't move to a different color tile");
        }
      } else {
        console.log("you can't move that far to the left");
      }
    },
    rightKeyOnDown: function() {
      // check tile right of the player to make sure it exists and is not obstructed.
      var currentTileIndex = this.tiles.getIndex(this.player.currentTile);
      
      if ((currentTileIndex + 1) % this.settings.numCols !== 0) {
        var nextTile = this.tiles.getAt(currentTileIndex + 1);
        
        if (this.isValidMove(this.player.currentTile, nextTile)) {        
          this.player.move(nextTile);
          //console.log(currentTileIndex);
        } else {
          console.log("you can't move to a different color tile");
        }
      } else {
        console.log("you can't move that far to the right");
      }
    },
    initLevel: function() {
      this.numTurns = this.gameSettings.numTurns;
      this.levelScore = 0;
      this.setupBoard();
      this.initHud();
    },
    setupBoard: function() {
      //this.tile = new Tile(this.game, this.settings.boardPosX, this.settings.boardPosY);
      //this.game.add.existing(this.tile);
      
      var xPos = 0,
          yPos = 0;

      this.tiles = this.game.add.group();
      for (var y = 0; y < this.settings.numRows; ++y) {
        yPos = y * this.settings.tileSize + this.settings.boardPosY;

        for (var x = 0; x < this.settings.numCols; ++x) {
          this.tiles.add(new Tile(this.game, (x * this.settings.tileSize + this.settings.boardPosX), yPos, -1));
        }
      }
      //console.log(this.tiles.length);
      this.player = new Player(this.game, this.tiles.getAt(0));      
      this.game.add.existing(this.player);
      
      // TODO: Setup spaz group (Need spaz objects... prefabs?)
      this.spazes = this.game.add.group();
      this.spazes.add(new Spaz(this.game, this.tiles.getAt(4), Spaz.Types.Blocker));
    },
    initHud: function() {
      var hudStyle = { font: '12px Helvetica', fill: '#fff', align: 'left' };
           
      this.turnsIndicator = this.game.add.text(16, 16, 'Turns Left: ' + this.numTurns, hudStyle);
      this.scoreIndicator = this.game.add.text(16, this.turnsIndicator.height + 16, 'Score: ' + 0, hudStyle);
      this.quitButton = this.game.add.button(16, this.game.height - 16, 'quitButton', this.quitButtonOnClick);
      
      this.quitButton.y -= this.quitButton.height;
    },
    quitButtonOnClick: function() {
      console.log('I quit...');
      this.game.state.start('menu');
    },
    updateHud: function() {
      // TODO: Update number of turns left and score indicator
      this.turnsIndicator.text = 'Turns Left: ' + this.numTurns;
      this.scoreIndicator.text = 'Score: ' + this.levelScore;
    },
    getSelectedTile: function(x, y) {
      var tileLeft = 0,
          tileRight = 0,
          tileBottom = 0,
          tileTop = 0,
          tileWidth = this.tiles.getAt(0).width,
          tileHeight = this.tiles.getAt(0).height,
          retVal = null;
  
      this.tiles.forEach(
        function(tile) {
          tileLeft = tile.x;
          tileRight = tile.x + tileWidth;
          tileTop = tile.y;
          tileBottom = tile.y + tileHeight;
          
          
          if (x > tileLeft && x < tileRight && y > tileTop && y < tileBottom) {
            //console.log(tile);
            retVal = tile;
            return tile;
          }
        }, this);
        
        return retVal;
    },
    isValidMove: function(currentTile, newTile) {
//      console.log(currentTile.frame);
//      console.log(newTile.frame);
      if (!currentTile || !newTile) {
        return false;
      }
      
      if (currentTile.frame === newTile.frame) {
        return true;
      }
    }
  };
  
  module.exports = Play;