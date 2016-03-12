var controller = {

  init: function(){
    model.init();
    shipModel.init();
    view.init();
    this.game_over = false;
    this.gameLoop();
  }, 

  gameLoop: function(square){
    
    if(this.game_over){
      return
    }

    view.render();

    if(shipModel.currentShip){
      if(shipModel.shipSunk(shipModel.currentShip)){
      alert("Ship down!")
      }
    }
    

    if(shipModel.allShipSunk()){
      alert("You win!")
      this.game_over =true;
    }
  }
}

$(document).ready(function() {
    controller.init();
});