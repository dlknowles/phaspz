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