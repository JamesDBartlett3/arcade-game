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
let isPaused = false;

// Whenever tab/window is focused, flip isPaused to false.
window.onfocus = function () {
    isPaused = false;
};
// Whenever tab/window is unfocused, flip isPaused to true.
window.onblur = function () {
    isPaused = true;
};

// Instantiate the player object using the Player constructor function
const player = new Player();

// Instantiate the enemy objects using the Enemy constructor function
const allEnemies = [...Array(3)].map((_, y) => new Enemy(-1, y+1, enemyBaseHealth));

// This listens for key presses and sends the keyCodes to
// the Player.handleInput() method.
document.addEventListener('keydown', function(e) {
    let inputKeys = {
        // keycodes for standard arrow keys movement controls
        37: 'l', // left arrow
        38: 'u', // up arrow
        39: 'r', // right arrow
        40: 'd', // down arrow
        // keycodes for "Thresh" Quake/FPS style movement controls
        65: 'l', // A key
        87: 'u', // W key
        68: 'r', // D key
        83: 'd' // S key
    };
    player.handleInput(inputKeys[e.keyCode]);
});
