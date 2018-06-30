/*
Set Difficulty Level
0 = "easy" mode,
1 = "normal" mode,
2 = "hard" mode,
3 = "ludicrous" mode. */
var difficultyLevel = 1;

/*
Set starting position for the player's avatar.
Value = Array containing 2 coordinates
startingPosition[0] = Player's starting position on the X axis.
startingPosition[1] = Player's starting position on the Y axis.
*/
var startingPosition = [2, 4];

// Declare global variables
var collisionProximity = 0.70;
var enemyBaseSpeed;
var enemyBaseRandomness;
var enemyBaseHealth = 1;
var playerScore = 0;

var allImages = [
  'images/stone-block.png',
  'images/water-block.png',
  'images/grass-block.png',
  'images/enemy-bug.png',
  'images/char-boy.png'
];


function setGlobalVars() {
  /*
  Set a base coefficient for enemy sprite speed.
  Difficulty level values:
  0.5 = "easy" mode (half-speed),
  1 = "normal" mode (default speed),
  2 = "hard" mode (double-speed),
  4 = "ludicrous" mode (quad-speed). */
  switch(difficultyLevel) {
    case 0:
      enemyBaseSpeed = difficultyLevel + 0.5;
      break;
    case 1:
    case 2:
      enemyBaseSpeed = difficultyLevel;
      break;
    case 3:
      enemyBaseSpeed = difficultyLevel + 1;
      break;
  }

  /*
  Set a randomness coefficient for enemy sprite speed.
  Difficulty level values:
  0 = "easy" mode (no randomness),
  1 = "normal" mode (default randomnes),
  2 = "hard" mode (double randomness),
  4 = "ludicrous" mode (quadruple randomness). */
  enemyBaseRandomness = difficultyLevel;


  /*
  Set a proximity coefficient for calculating player collision with enemy sprites.
  Value = Distance (in blocks) the player must keep between their character
  and all enemy sprites in order to avoid collisions.
  Difficulty level values:
  0.40 = "easy" mode (collisions occur when player & enemy overlap by ≈1/2 block),
  0.70 = "normal" mode (collisions occur when sprites make contact),
  1.00 = "hard" mode (collisions occur at ≈1/2 block distance from enemies),
  1.30 = "ludicrous" mode. (collisions occur at ≈1 block distance from enemies) */
  switch(difficultyLevel) {
    case 0:
      collisionProximity = 0.40;
      break;
    case 1:
      collisionProximity = 0.70;
      break;
    case 2:
      collisionProximity = 1.00;
      break;
    case 3:
      collisionProximity = 1.30;
      break;
  }
}
