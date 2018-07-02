/* ========================================================== *\
| ES6 / OOP "Class-Based" JavaScript Implementation
|
| The following code is based on the ZOOM webinar
| hosted by Rodrick Bloomfield on June 21st, 2018
| (Video link @ http://tiny.cc/ArcadeGameCloneProject)
| @Rodrick [FEND] on Slack (gwgnanodegrees.slack.com)
| @bloom305 on GitHub (https://github.com/bloom305)
|
| Thank you, Rodrick, for demonstrating the power and
| simplicity of ES6 / OOP class-based JavaScript!
|
\* ========================================================== */



/* ----------=========== <Character Class> ===========---------- *\
*/
class Character {
  constructor() {
    // all character sprites' paths start with 'images/'.
    // start with that, then append the rest to each individual object as needed.
    this.sprite = 'images/';
  }

  draw() { // when a character's draw() method is called,
    // use the drawImage function to draw the sprite on the board at the appropriate coordinates.
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y * 82)-20);
    /* Note: I had to add the '-20' bit at the end to compensate for the artificial perspective in the game board blocks. Without this, sprites were vertically aligned dead center over their blocks, but looked like they were hanging over the block below by a few px, due to inconsistent application of perspective. This change gives the sprites the same amount of artifial perspective the blocks have, which makes the whole thing look much more realistic. */
  }

  subtractHealth(amount) {
    // when a character's subtractHealth() method is called,
    // log the character's current health
    console.log(`${this.constructor.name}'s health before collision: ${this.health}`);
    // decrement it by the value of 'amount' parameter, which was set by the method's argument
    this.health -= amount;
    // log new health value
    console.log(`${this.constructor.name}'s health after collision: ${this.health}`);
  }

  /*
  Returns true when player sprite collides with an enemy sprite (or vice versa). Returns false otherwise. There is a function in engine.js with the same name as this method. It calls this method on all player and enemy objects every round, checking each for collisions with any object of the opposite class. Thus, any enemy colliding with the player object generates a collision event, while enemy objects cannot generate collision events by colliding with each other.
  */
  checkCollisions(thing) { // when a character's checkCollisions() method is called,
    // if the 2 sprites have the same y coordinate
    if(this.y === thing.y) {
      // AND if their x coordinates are within the range specified by collisionProximity
      if(this.x >= thing.x - collisionProximity && this.x <= thing.x + collisionProximity) {
        return true; // then return true
      }
    }
    else { // otherwise return false
      return false;
    }
  }
}
/* ----------=========== </Character Class> ===========---------- \*



\* ----------===========  <Enemy Class>  ===========---------- */
// Instantiate the Enemy class, as an extension of the Character class
class Enemy extends Character {
  // the construtor takes 3 arguments - x-axis, y-axis, and health
  constructor(x, y, h) {
    super(); // inherit methods from parent class
    this.health = h; // set health of enemy object
    // append playerSprite to parent's sprite string, completing path to image
    this.sprite += enemySprite;
    // set x and y coordinates for enemy sprite to appear on the board
    this.x = x;
    this.y = y;
  }

  deploy() { // set the enemy object to a position on the x-axis
    // set x-axis position as a random number between 0 and 4 (inclusive).
    this.x = randInt(0, 4);
  }

  update(dt) {
    // when enemy sprite moves off the screen on the x-axis,
    if(this.x > 5) {
      this.x = -1; // move it back to the start
    }
    else { // otherwise, increment forward movement by value of 'dt'
      this.x += dt;
    }
  }
}
/* ----------=========== </Enemy Class> ===========---------- \*



\* ----------=========== <Player Class> ===========---------- */
// Instantiate the Player class, as an extension of the Character class
class Player extends Character {
  constructor() {
    super(); // inherit methods from parent class
    this.health = playerBaseHealth; // set health of player object
    this.x = startingPosition[0];
    this.y = startingPosition[1];
    // TODO: Allow player to select their own avatar sprite
    // append playerSprite to parent's sprite string, completing path to image
    this.sprite += playerSprite;
    this.moving = false; // player avatar is initialized as stationary
    this.win = false; // newly initialized player object cannot have won yet.
  }

  // Take input from keypresses, and translate them to player avatar movement
  handleInput(input) {
    switch(input) {
      case 'l': // if input key is 'left'
        // and current position on x-axis is greater than 0,
        this.x > 0 ? this.x -- : this.x; // decrement this.x by 1.
        break;
      case 'r': // if input key is 'right'
        // and current position on x-axis is less than 4,
        this.x < 4 ? this.x ++ : this.x; // increment this.x by 1.
        break;
      case 'u': // if input key is 'up'
        // and current position on y-axis is greater than 0,
        this.y > 0 ? this.y -- : this.y; // decrement this.y by 1.
        break;
      case 'd': // if input key is 'down'
        // and current position on y-axis is less than 4,
        this.y < 4 ? this.y ++ : this.y; // increment this.y by 1.
    }
    this.moving = true; // tell update() that the player is still moving
  }

  draw() {
    super.draw(); // call the draw() method from the Character class
    this.moving = false; // tell update() that the player finished moving
  }

  reset() { // move the player avatar back to its starting position
    this.x = startingPosition[0];
    this.y = startingPosition[1];
  }

  update(dt) {
    // if player has made it to the water, is no longer moving,
    // and hasn't already won, set 'this.win' to true
    if(this.y < 1 && !this.moving && !this.win) {
      this.win = true;
    }
  }
}
/* ----------=========== </Player Class> ===========---------- \*
*/
