
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
