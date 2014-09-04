
'use strict';

var Globals = require('../lib/globals'),
    Utilities = require('../lib/utilities');

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/sprites/preloader.gif');
    
  },
  create: function() {
    this.initGlobals();    
    
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
    this.game.globals = new Globals();
    this.game.utilities = new Utilities();
  },
  initGlobals: function() {
    
    this.game.settings = {
      tileSize: 32,
      numCols: 9,
      numRows: 9,
      boardPosX: 176,
      boardPosY: 16,
      defaultPlayerFrame: 0
    };
    
    this.game.currentLevel = {
      settings: {
        numTiles: 3,
        numTurns: 25
      }
    };
  }
};

module.exports = Boot;
