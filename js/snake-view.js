var Board = require('./snake.js');

var SIZE = 50;

function View(rootEl) {
  this.board = new Board(SIZE);
  this.$rootEl = rootEl;
  this.setupBoard();
  this.registerEvents();
  this.intervalId = window.setInterval(this.step.bind(this), 50);
}

window.$l.extend(View.prototype, {
  setupBoard: function() {
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        var $div = document.createElement('div');
        $div = window.$l($div);
        $div.addClass('row-' + i + '-col-'+j);
        this.$rootEl.append($div);
      }
    }
  },

  registerEvents: function() {
    document.addEventListener('keydown', this.handleKeyEvent.bind(this));
  },

  handleKeyEvent: function(e) {
    var code = e.keyCode;
    var direction = (String.fromCharCode(code)).toLowerCase();
    this.board.turnSnake(direction);
  },

  render: function() {
    window.$l('div').removeClass('snake-segment');
    window.$l('div').removeClass('snake-segment2');

    this.board.snake.segments.forEach(function(pos) {
      var row = pos[0];
      var col = pos[1];
      window.$l('.snake').
        find('.row-' + row + '-col-'+ col).addClass('snake-segment');
    });

    this.board.snake2.segments.forEach(function(pos) {
      var row = pos[0];
      var col = pos[1];
      window.$l('.snake').
        find('.row-' + row + '-col-'+ col).addClass('snake-segment2');
    });

    window.$l('div').removeClass('apple');
    var applePos = this.board.applePos;
    
    window.$l('.snake').
      find('.row-' + applePos[0]+ "-col-" + applePos[1]).addClass('apple');
  },

  step: function() {
    this.board.moveSnake();
    this.render();
    if (this.board.gameOver) {
      window.clearInterval(this.intervalId);
      alert("Gameover!");
    }
  },
});

module.exports = View;
