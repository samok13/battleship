var view = {

  init: function() {
    $("button").on("click", function(event){
      location.reload();
    });
    this.render();
  },

  addClickHandler: function(){
    $(".square").on("click", function(event){
      console.log(event.target);
      // this.hitLocationID = $(event.target).attr('data-id');
      // this.hitPositionIndex = $(event.target).attr('position-id');
      // controller.gameLoop(event.target);
    })

  },

  render: function() {
    $("#board").html("");  

    for (var y = 0; y < model.board_size; y++){
      for (var x = 0; x < model.board_size; x++){
        $("#board").append('<div class="square" data-x="'+ x +'" data-y="'+ y +'" ></div>');
      //   if(this.hitLocationID){
      //     if(shipModel.shipOnPoint(this.hitLocationID, this.hitPositionIndex)){
      //      $("#board").append("<div class='square'>S</div>");
      //     }
      //     else{
      //      $("#board").append("<div class='square'>M</div>");
      //     }   
      //   }
      //   else{
      //     $("#board").append("<div class='square'>o</div>");
      //   }                                  
      // }
      }
    $("#board").append('<br>');
    } 
    this.addClickHandler();
  },

  shipToBoard: function(ship) {

    for (var i = 0; i < ship.positions.length; i++){
      var $ship = $("<div class='ship square' data-id='" + ship.id + "'position-id='"+ i +"'>ship</div>");
      $('#board').append($ship);
    } 
  }


}