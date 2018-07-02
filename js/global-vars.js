/* Set Difficulty Level
0 = "easy" mode,
1 = "normal" mode,
2 = "hard" mode,
3 = "ludicrous" mode. */
const difficultyLevel = 1;

// Create array containing the x,y coordinates of the player's starting position.
const startingPosition = [2, 4];

// Set value for proximity at which two objects will be considered to have collided.
const collisionProximity = 0.70;

// Set player's initial health value.
const playerBaseHealth = 5;

// Set enemySprite to the desired enemy avatar.
const enemySprite = 'enemy-bug.png';

// Set playerSprite to the desired player avatar.
const playerSprite = 'char-boy.png';

// Create array containing all images that the game will need to load.
const allImages = [
  'images/stone-block.png',
  'images/water-block.png',
  'images/grass-block.png',
  'images/enemy-bug.png',
  'images/char-boy.png'
];

// Declare global variables
var enemyBaseSpeed;
var enemyBaseRandomness;
var enemyBaseHealth;
var playerScore;
var currentLevel;


// Set coefficients for all object characteristics based on difficultyLevel.
function setGlobalVars() {
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
}
