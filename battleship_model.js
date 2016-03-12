var DIRECTION = {
  VERTICAL: 'VERTICAL',
  HORIZONTAL: 'HORIZONTAL'
}

var STATE_OPTIONS ={
  OPEN: 'OPEN',
  HIT: 'HIT',
  SHIP: 'SHIP',
  MISS: 'MISS'
}

var model = {

  init: function(){
    this.board_size = 10;
    this.squares = [];


    for (var y = 0; y < model.board_size; y++){
      this.squares.push([]);
      for (var x = 0; x < model.board_size; x++){
        var square = {};
        square.state = STATE_OPTIONS.OPEN;
        this.squares[y].push(square);
      }
    }

  },

  randomLocation: function(){
    return [
      _.random(1, this.board_size) - 1,
      _.random(1, this.board_size) - 1 
    ];
  }, 

  shipDirection: function(){
    return _.sample(DIRECTION.VERTICAL, 
                    DIRECTION.HORIZONTAL);
  }
}

var shipModel = {

  init: function(){
    this.shipLengthArray = [1,1,1,2,2,3];
    this.shipsArray = [];

    function add(sum,element){
      return sum + element;
    }

    this.totalHits = this.shipLengthArray.reduce(add, 0);

    for (var i = 0; i < this.shipLengthArray.length; i++){
      this.createShip(this.shipLengthArray[i], i);
    }
  },

  createShip: function(length, idx) {
    var ship = {};
    ship.direction = model.shipDirection();
    ship.length = length;
    ship.id = idx;
    ship.hits = 0;
    this.placeShip(ship);

    this.shipsArray.push(ship);
  },

  //this doesn't have validations on placement yet
  placeShip: function(ship) {
    ship.headLocation = model.randomLocation();
    ship.x = ship.headLocation[0];
    ship.y = ship.headLocation[1];

  
    for(var i = 0; i < ship.length; i++){
      var y;
      var x;
      if (this.direction === DIRECTION.HORIZONTAL){
        y = ship.y;
        x = ship.x + i;
      }
      else{
         y = ship.y + i;
         x = ship.x;
      } 
      if (y >= model.board_size || x >= model.board_size || model.squares[y][x].state === STATE_OPTIONS.SHIP){
        location.reload();
      }
      else{
        var newSquare = {
          state: STATE_OPTIONS.SHIP,
          ship: ship
        };

        model.squares[y][x] = newSquare;
      }
    }
    view.render();
  },

  checkPoint: function(posX, posY) {
    var square = model.squares[posY][posX];

    if(square.state === STATE_OPTIONS.SHIP){
      square.state = STATE_OPTIONS.HIT;
      square.ship.hits++;
      this.shipSunk(square.ship)
    }
    else{
      square.state = STATE_OPTIONS.MISS;
    }
  },

  shipSunk: function(ship) {
    if(ship.hits >= ship.length){
      alert("Ship down!");
      this.allShipSunk();
      return true;
    }
    else{
      return false;
    }
  },

  allShipSunk: function() {
    var currentHits = shipModel.shipsArray.reduce(function(sum, ship){ return sum + ship.hits}, 0);
    if(currentHits >= this.totalHits){
      alert("You win!");
      location.reload();
    }
  }
}