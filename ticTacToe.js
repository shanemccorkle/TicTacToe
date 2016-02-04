// $(document).ready(function() {$("#playAgainButton").click(startGame)});

$(document).ready(function startGame() {

  var boardArray = new Array(9);
  var winning = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];
  var x = "<img src='https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/512/multiply-.png'/>";
  var o = "<img src='https://cdn-images-1.medium.com/max/400/1*aIo-DoVaO8H6B1jZ-vzFuA.png'/>"
  var xTurn = true;
  var winnerFound = false;
  var player = 0;
  var computer = 0;
  var tie = 0;
  var boardArray = new Array(9);
  boardArray.fill("empty");

  $(".rowScore").toggle();
  $(".restart").toggle();
  $("#startButton").click(function(event) {
    $(".jumbotron").fadeOut('1000');
    $(".rowScore").fadeIn('2000');
    $(".gameCell").click(takeTurns);
  });

  function takeTurns() {
    var boardPos = ($(this).parent().index() * 3) + $(this).index();

    if(xTurn && boardArray[boardPos] === "empty" && !winnerFound) {
      $(this).html(x);
      boardArray[boardPos] = "X";
      xTurn = false;
      processWinner();
    } else if (boardArray[boardPos] === "empty" && !winnerFound){
      $(this).html(o);
      boardArray[boardPos] = "O";
      xTurn = true;
      processWinner();
    } else {
      // alert("There is already a X or O there!");
    }
    if (boardArray.indexOf("empty") === -1 && !winnerFound) {
      alert("Board is full! It's a cat scratch!");
      processWinner();
      tie++;
      $(".ties > p").text(tie);
      $(".restart").fadeIn('2000');

    }
  }

  function boardReset() {
    boardArray.fill("empty");
    xTurn = true;
    winnerFound = false;
    $(".gameCell").html("");
  };

  function processWinner() {
    var checkXO;
    var winner;
    var winnerSpot;
    for (var i = 0; i < 8; i++) {
        if((boardArray[winning[i][0]] === boardArray[winning[i][2]]) && (boardArray[winning[i][0]] === boardArray[winning[i][1]]) &&
        (boardArray[winning[i][0]] != "empty")) {
          winner = true;
          alert(boardArray[winning[i][0]] + " won!");
          switch (boardArray[winning[i][0]]) {
            case "X":
              player++;
              $(".playerScore > p").text(player)
              $(".restart").fadeIn('2000');
              break;
            default:
              computer++;
              $(".computerScore > p").text(computer)
              $(".restart").fadeIn('2000');
          }

          winnerFound = true;
          break;
        }
    }
  }
  $("#playAgainButton").click(boardReset);
});
