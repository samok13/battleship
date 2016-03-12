var DIRECTION = {
  VERTICAL: 'VERTICAL',
  HORIZONTAL: 'HORIZONTAL'
}

var model = {

  init: function(){
    this.board_size = 10;
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

    for (var i = 0; i < this.shipLengthArray.length; i++){
      this.createShip(this.shipLengthArray[i], i);
    }
  },

  createShip: function(length, idx) {
    var ship = {};
    ship.direction = model.shipDirection();
    ship.length = length;
    ship.id = idx;
    this.placeShip(ship);
  },

  //this doesn't have validations on placement yet
  placeShip: function(ship) {
    ship.headLocation = model.randomLocation();
    ship.x = ship.headLocation[0];
    ship.y = ship.headLocation[1];
    ship.node = new Array(ship.length);
    ship.positions = [];
  
    for(var i = 0; i < ship.length; i++){
      var position;
      if (this.direction === DIRECTION.HORIZONTAL){
        position = [ship.x + i, ship.y, 0];
      }
      else{
        position = [ship.x, ship.y + i, 0];
      } 
      ship.positions.push(position);
    }
    shipModel.shipsArray.push(ship);
    
    //view.shipToBoard(ship);
  },

  shipOnPoint: function(hitLocationID, hitPositionIndex) {
    var return_value = false;

    for (var i = 0; i < this.shipsArray.length; i++){
      this.currentShip = this.shipsArray[i];
      if(_.isEqual((hitLocationID), currentShip.id)){
        currentShip[hitPositionIndex][2] = [1];
        return_value = true;
      }
    }
    return return_value;
  },

  shipSunk: function(ship) {
    var sunkSpots = 0;
    var totalShipsSunk = 0;

    for (var i = 0; i < ship.positions.length; i++){
      if(_.isEqual((ship.positions[i][2]), 1)){
        this.sunkSpots++;
      }
    } 
    if(sunkSpots === ship.positions.length) {
      this.totalShipsSunk++;
      return true;
    }
    else{
      return false;
    }
  },

  allShipSunk: function() {
    if(this.totalShipsSunk === shipModel.shipLengthArray.length){
      return true;
    }
  }

}