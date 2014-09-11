(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Globals = function() {
  this.PlayerFrames = [6];
  this.TileFrames = [0, 1, 2, 3, 4, 5];
  this.SpazBlockerFrames = [11];
  this.SpazChangerFrames = [11];
  this.SpazWallerFrames = [11];
  this.SpazGroundPounderFrames = [11];
  this.SpazLobberFrames = [11];
  this.SpazSplitterFrames = [11];
  this.ChangerChance = 0.3;
  this.WallerChance = 0.3;
  this.GroundPounderChance = 0.3;
  this.LobberChance = 0.15;
  this.SplitterChance = 0.2;
  this.SplitterMaxSize = 5;
  
  this.Directions = {
    Up: 1,
    Right: 2, 
    Down: 3,
    Left: 4
  };
  
  this.Levels = [
    {
      map: [],
      maxTurns: '',
      maxColors: '',
      maxGems: '',
      dynamite: '',
      concrete: '',
      acidFlasks: '',
      spazArray: []
    }
  ];
};

module.exports = Globals;
},{}],2:[function(require,module,exports){
'use strict';

var Utilities = function () {
  this.getRandomTile = function(numTiles) {
    var max = (numTiles - 1) || 0;
    
    if (isNaN(max) || max < 0) {
      max = 0;
    }
    
    return Math.floor(Math.random() * (max + 1));
  };
  
  this.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
};

module.exports = Utilities;
},{}],3:[function(require,module,exports){
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
},{"./states/boot":7,"./states/gameover":8,"./states/menu":9,"./states/play":10,"./states/preload":11}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
  // blockers just sit there
  
};

Spaz.prototype.changerUpdate = function() {
  // changers move sometimes. 
  // when they do, they change the color of the tile they moved to so that it is the same as the one they moved from.
  if (Math.random() > this.game.globals.ChangerChance) {
    // pick a direction to move in. 
    var directionValue = this.game.utilities.getRandomInt(1, 4);
    
    // make sure the tile in the move direction isn't blocked
        
    // if the new tile isn't blocked, move there
    
    // change the color of the new tile to match the previous tile.
    
  }
};

Spaz.prototype.wallerUpdate = function() {
  // when wallers move, they put a wall in the tile they left.
  
};

Spaz.prototype.groundPounderUpdate = function() {
  // when ground pounders move, they leave a hole in the tile they left.
  
};

Spaz.prototype.lobberUpdate = function() {
  // lobbers don't move, they just throw blockers around the board.
  
};

Spaz.prototype.splitterUpdate = function() {
  // splitters act like changers.
  // they get a little bigger with each move. when they get too big, they split into two splitters.
  
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){

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

},{"../lib/globals":1,"../lib/utilities":2}],8:[function(require,module,exports){

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

},{}],9:[function(require,module,exports){

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

},{}],10:[function(require,module,exports){

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
},{"../prefabs/player":4,"../prefabs/spaz":5,"../prefabs/tile":6}],11:[function(require,module,exports){

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
    this.load.spritesheet('sprites', 'assets/sprites/spazspritesheet.png', 32, 32);
//    this.load.spritesheet('tiles', 'assets/sprites/tilesandobjects' + settings.tileSize + '.png', settings.tileSize, settings.tileSize);
//    this.load.spritesheet('player', 'assets/sprites/player.png', settings.tileSize, settings.tileSize);
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

},{}]},{},[3])