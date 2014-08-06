(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(480, 320, Phaser.AUTO, 'spaz');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":3,"./states/gameover":4,"./states/menu":5,"./states/play":6,"./states/preload":7}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){

'use strict';

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
        numTiles: 3
      }
    };
  }
};

module.exports = Boot;

},{}],4:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],5:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};

    this.titleText = this.game.add.text(this.game.world.centerX, 10, 'Title here', style);
    this.titleText.anchor.setTo(0.5, 0);

    this.instructionsText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 50, 'Click the button', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5, 0.5);
  },
  startClick: function() {
    this.game.state.start('play');
  },
  update: function() {
    
  }
};

module.exports = Menu;

},{}],6:[function(require,module,exports){

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
},{"../prefabs/tile":2}],7:[function(require,module,exports){

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

},{}]},{},[1])