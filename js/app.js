/*--------------------------------------------------------------
| Basic design & functionality ideas:
| = Current Score & High Score
| = Welcome Modal w/
|   - Sprite Set Selection
|   - Color Scheme Selection
|   - Difficulty Level (Increases Enemy Speed & Quantity)
| = Randomized Enemy Speed & Direction
|
| Advanced design & functionality ideas:
| = Responsive Layout
| = Touchscreen compatible controls
| = Weapons
| = Animated Sprites
| = Cheat Codes
|--------------------------------------------------------------*/

// 
const player = new Player();
const allEnemies = [...Array(3)].map((_,e) => new Enemy(0,e+1));


// This listens for key presses and sends the keyCodes to
// the Player.handleInput() method.
document.addEventListener('keyup', function(e) {
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
