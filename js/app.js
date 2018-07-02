/*--------------------------------------------------------------
| TODO:
|
| Basic design & functionality:
| = Current Score & High Score
| = Player Health Meter
| = Welcome Modal w/
|   - Sprite Set Selection
|   - Color Scheme Selection
|   - Difficulty Level (Increases Enemy Speed, Quantity & Health)
| = Randomized Enemy Speed & Direction
|
| Advanced design & functionality:
| = Responsive Layout
| = Touchscreen compatible controls
| = Weapons
| = Animated Sprites
| = Floating health meters for player and enemy avatars
| = Cheat Codes
|--------------------------------------------------------------*/

// Create a boolean variable to track the game's paused state.
let gamePaused = false;

// Whenever tab/window is focused, flip gamePaused to false.
window.onfocus = function () {
    gamePaused = false;
};
// Whenever tab/window is unfocused, flip gamePaused to true.
window.onblur = function () {
    gamePaused = true;
};

// Instantiate the player object using the Player constructor function
const player = new Player();

// Instantiate the enemy objects using the Enemy constructor function
const allEnemies = [...Array(3)].map((_, e) => new Enemy(0, e+1, enemyBaseHealth));

// This listens for key presses and sends the keyCodes to
// the Player.handleInput() method.
document.addEventListener('keydown', function(e) {
    let allowedKeys = {
        37: 'left', // left arrow
        38: 'up', // up arrow
        39: 'right', // right arrow
        40: 'down', // down arrow
        // keycodes for "Thresh" Quake/FPS style movement controls
        65: 'left', // A key
        87: 'up', // W key
        68: 'right', // D key
        83: 'down' // S key
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
