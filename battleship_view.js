var view = {

  init: function() {
     
    $("#board").on("click", ".square", function(event){
      console.log(event.target);
      // this.hitLocationID = $(event.target).attr('data-id');
      // this.hitPositionIndex = $(event.target).attr('position-id');
      // controller.gameLoop(event.target);
    })

    $("button").on("click", function(event){
      location.reload();
    });
    this.render();
  },

  render: function() {
  

    for (var y = 0; y < model.board_size; y++){
      for (var x = 0; x < model.board_size; x++){
        
        if(this.hitLocationID){
          if(shipModel.shipOnPoint(this.hitLocationID, this.hitPositionIndex)){
           $("#board").append("<div class='square'>S</div>");
          }
          else{
           $("#board").append("<div class='square'>M</div>");
          }   
        }
        else{
          $("#board").append("<div class='square'>o</div>");
        }                                  
      }
      $("#board").append('<br>');
    }

  },

  shipToBoard: function(ship) {

    for (var i = 0; i < ship.positions.length; i++){
      var $ship = $("<div class='ship square' data-id='" + ship.id + "'position-id='"+ i +"'>ship</div>");
      $('#board').append($ship);
    } 
  }


}