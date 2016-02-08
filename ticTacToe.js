// $(document).ready(function() {$("#playAgainButton").click(startGame)});

$(document).ready(function startGame() {

  var boardArray = new Array(9);
  var winning = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];
  var x = "x1";
  var x2 = "x2";
  var o = "<div class='o'></div>";
  var x = "<div class='x1'></div><div class='x2'></div>";
  var xTurn = true;
  var winnerFound = false;
  var player = 0;
  var computer = 0;
  var againstComputer = false;
  $(".sqComputer").addClass('blackComputer');
  var tie = 0;
  var computerEasy = false;
  var computerMedium = false;
  var computerHard = false;
  var boardArray = new Array(9);
  boardArray.fill(0);
  $(".level").toggle();

  $(".playerScore > h3").click(function() {
    $(".playerScore > input").toggle();
  });

  $(".playerLevel").hover(function(){
        $(".level").animate({
            height: 'toggle'
        });
    });

    // Changes difficulty to easy once clicked
  $(".sqComputerLevelEasy").click(function() {
    $(".sqComputer").removeClass();
    $("#computer").addClass('sqComputer greenComputer');
    $(".computerScore > h3").text('COMPUTER (O)');
    againstComputer = true;
    computerEasy = true;
    computerMedium = false;
    computerHard = false;
  });
  // Changes difficulty to medium once clicked
  $(".sqComputerLevelMedium").click(function() {
    $(".sqComputer").removeClass();
    $("#computer").addClass('sqComputer orangeComputer');
    $(".computerScore > h3").text('COMPUTER (O)');
    againstComputer = true;
    computerEasy = false;
    computerMedium = true;
    computerHard = false;
  });
  // Changes difficulty to hard once clicked
  $(".sqComputerLevelHard").click(function() {
    $(".sqComputer").removeClass();
    $("#computer").addClass('sqComputer redComputer');
    $(".computerScore > h3").text('COMPUTER (O)');
    againstComputer = true;
    computerEasy = false;
    computerMedium = false;
    computerHard = true;
  });
  // Changes back to two player mode
  $(".sqPlayer").click(function() {
    $(".sqComputer").removeClass();
    $("#computer").addClass('sqComputer blackComputer');
    $(".computerScore > h3").text('PLAYER 2 (O)');
    againstComputer = false;
  });


  // Allows user to click and change name of player 1 or player 2 and displays at bottom of the board
  $(".playerScore > button").click(function() {
    var name = $(".playerScore > input").val();
    $(".playerScore > h3").text(name.toUpperCase() + " (X)");
    $(".playerScore > input").toggle();
  });

  $(".computerScore > h3").click(function() {
    $(".computerScore > input").toggle();
  })

  $(".computerScore > button").click(function() {
    var name = $(".computerScore > input").val();
    $(".computerScore > h3").text(name.toUpperCase() + " (O)");
    $(".computerScore > input").toggle();
  });

  // Initializes the board and toggles everything to show once the game has started
  $(".restart").toggle();
  $(".intro").click(function(event) {
    $("header").fadeOut('slow');
    $(".bigO").animate({left: '200%'}, 1000);
    $(".bigX1").animate({left: '-200%'}, 1000);
    $(".bigX2").animate({left: '-200%'}, 1000);
    setTimeout(function(){ $(".intro").hide(); }, 1000);
    $(".playerScore > input").toggle();
    $(".playerScore > button").toggle();
    $(".computerScore > input").toggle();
    $(".computerScore > button").toggle();
    $(".gameCell").click(takeTurns);
  });

  // Determines whose turn it is and allows the users to place and X or O on the board. If it is against the computer then it goes after x has gone.
  function takeTurns() {
    var boardPos = ($(this).parent().index() * 3) + $(this).index();

    if(xTurn && boardArray[boardPos] === 0 && !winnerFound ) {
      // $(this).children('.gameCellInside').addClass("x1 x2");
      // $(this).children('.fillX2').addClass(x2);
      $(this).html(x);
      boardArray[boardPos] = 1;
      xTurn = false;
      processWinner();
      if(againstComputer && !winnerFound) {
        setTimeout(function() {computerTurn(boardPos)}, 1000);
      }
    } else if (boardArray[boardPos] === 0 && !winnerFound && !againstComputer){
      $(this).html(o);
      boardArray[boardPos] = -1;
      xTurn = true;
      processWinner();
    }

    if (boardArray.indexOf(0) === -1 && !winnerFound) {
      processWinner();
      tie++;
      $(".ties > p").text(tie);
      $(".displayMessage").fadeIn(1500);
      $(".displayMessage").text("Board is full. It was a tie!")
      $(".displayMessage").fadeOut(2000);
      //pause for 2 seconds
      $(".restart").fadeIn('2000');

    }
  }

  // Is called when it is the computer's turn to go and picks a random number(index) on the baord that is not currently used.
  function computerTurn(boardPos) {
    var easyTurnIndex = findEmptySpot();
    var medTurnIndex;
    var medPosFound = false;
    var hardTurnIndex;
    var hardMoveFound = false;
    var i = 1;

    if (computerMedium === true) {
      do {
        if(boardArray[boardPos+i] === 0) {
          medTurnIndex = boardPos + i;
          medPosFound = true;
        } else if (boardArray[boardPos-i] === 0) {
          medTurnIndex = boardPos - i;
          medPosFound = true;
        }
        i++;
      } while (!medPosFound)
    }

    if (computerHard === true) {
      for (var i = 0; i < 8; i++) {
        var a = boardArray[winning[i][0]];
        var b = boardArray[winning[i][1]];
        var c = boardArray[winning[i][2]];

        if((a+b+c) === 2) {
          if(a === 0) {
          hardTurnIndex = winning[i][0];
          hardMoveFound = true;
          } else if (b === 0) {
          hardTurnIndex = winning[i][1];
          hardMoveFound = true;
          } else if (c === 0) {
          hardTurnIndex = winning[i][2];
          hardMoveFound = true;
          }
        }
      }
      if (!hardMoveFound) {
        hardTurnIndex = findEmptySpot();
        hardMoveFound = true;
      }
    }


    if ((boardArray[easyTurnIndex] === 0) && (computerEasy === true)) {
      $(".gameCell").eq(easyTurnIndex).html(o).fadeIn(2000);
      boardArray[easyTurnIndex] = -1;
      xTurn = true;
      processWinner();
    } else if ((boardArray[medTurnIndex] === 0) && (computerMedium === true)) {
      $(".gameCell").eq(medTurnIndex).html(o).fadeIn(2000);
      boardArray[medTurnIndex] = -1;
      xTurn = true;
      processWinner();
    } else if(computerHard ===true) {
      $(".gameCell").eq(hardTurnIndex).html(o).fadeIn(2000);
      boardArray[hardTurnIndex] = -1;
      xTurn = true;
      processWinner();
    } else {
      computerTurn();
    }
  };

  function findEmptySpot() {
    var turnIndex = Math.floor(Math.random()*boardArray.length);
    if (boardArray[turnIndex] === 0) {
      return turnIndex;
    } else {
      findEmptySpot();
    }
  }

  // Resets the baord so users can play again
  function boardReset() {
    boardArray.fill(0);
    xTurn = true;
    winnerFound = false;
    $(".gameCell").html("");
    $(".restart").toggle();
  };

  $(".playerScore > input").keypress(function(e){
    if (e.which == 13){
        $(".playerScore > button").click();
    }
});
$(".computerScore > input").keypress(function(e){
  if (e.which == 13){
      $(".computerScore > button").click();
  }
});

  // Runs after every move and checks to make sure that no one has won.
  function processWinner() {
    var checkXO;
    var winnerSpot;
    for (var i = 0; i < 8; i++) {
      var a = boardArray[winning[i][0]];
      var b = boardArray[winning[i][1]];
      var c = boardArray[winning[i][2]];
        if (a+b+c === 3) {
          winnerFound = true;
          player++;
          $(".displayMessage").text("X won!").fadeIn('1500');
          $(".playerScore > p").text(player)
          $(".restart").fadeIn('2000');
        } else if (a+b+c === -3) {
          computer++;
          winnerFound = true;
          $(".displayMessage").text("O won!").fadeIn('1500');
          $(".computerScore > p").text(computer)
          $(".restart").fadeIn('2000');
        }
    }
  }

  $("#playAgainButton").click(boardReset);

});
