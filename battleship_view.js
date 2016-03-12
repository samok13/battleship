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
      var posX = parseInt($(event.target).attr('data-x'));
      var posY = parseInt($(event.target).attr('data-y'));
      shipModel.checkPoint(posX, posY);
      view.render()
    })

  },

  render: function() {
    $("#board").html("");  

    for (var y = 0; y < model.board_size; y++){
      for (var x = 0; x < model.board_size; x++){
        var state = model.squares[y][x].state;

        $("#board").append('<div class="square ' + state +'"data-x="'+ x +'" data-y="'+ y +'" ></div>');
   
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