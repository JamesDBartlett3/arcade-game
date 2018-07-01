/* ===================================================== *\
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
\* ===================================================== */



/* ----------=========== <Entity Class> ===========---------- */
class Entity {
  constructor() {
    // all entity sprites' paths start with 'images/', so add that.
    this.sprite = 'images/';
    // set initial x and y coordinates to 0.
    this.x = 0;
    this.y = 0;
  }
  update(dt) { // when an entity's update() method is called,
    // check x and y coordinates and set isOutOfBounds booleans accordingly
    this.isOutOfBoundsX = this.x > 5;
    this.isOutOfBoundsY = this.y < 1;
  }

  render() { // when an entity's render() method is called,
    // use the drawImage function to draw the sprite on the board at the appropriate coordinates.
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y * 82)-20);
    /* Note: I had to add the '-20' bit at the end to compensate for the artificial perspective
    in the game board blocks. Without this, sprites were vertically aligned dead center over
    their blocks, but looked like they were hanging over the block below by a few px, due to
    inconsistent application of perspective. This change gives the sprites the same amount of
    artifial perspective the blocks have, which makes the whole thing look much more realistic. */
  }

  subtractHealth(amount) { // when an entity's subtractHealth() method is called,
    // log the entity's current health
    console.log(`${this.constructor.name}'s health before collision: ${this.health}`);
    // decrement it by the value of 'amount' parameter, which was set by the method's argument
    this.health -= amount;
    // log new health value
    console.log(`${this.constructor.name}'s health after collision: ${this.health}`);
  }

  /*
  Returns true when player sprite collides with an enemy sprite (or vice versa). Returns false otherwise.
  There is a function in engine.js with the same name as this method. It calls this method on all player
  and enemy objects every round, checking all for collisions with an object of the opposite class.
  Thus, any enemy colliding with the player object generates a collision event, while enemy objects
  cannot generate collision events with each other.
  */
  checkCollisions(playerOrEnemy) { // when an entity's checkCollisions() method is called,
    // if the 2 sprites have the same y coordinate
    if(this.y === playerOrEnemy.y) {
      // AND if their x coordinates are within the range specified by collisionProximity
      if(this.x >= playerOrEnemy.x - collisionProximity && this.x <= playerOrEnemy.x + collisionProximity) {
        return true;
      }
    }
    else {
      return false;
    }
  }
}
/* ----------=========== </Entity Class> ===========---------- */



/* ----------=========== <Player Class> ===========---------- */
class Player extends Entity {
  constructor() {
    super(); // inherit methods from parent class
    this.health = playerBaseHealth; // set health of player object to
    this.x = startingPosition[0];
    this.y = startingPosition[1];
    // TODO: Allow user to select their own character sprite
    this.sprite += playerSprite;
    this.moving = false;
    this.win = false;
  }

  update(dt) {
    super.update();
    if(this.isOutOfBoundsY && !this.moving && !this.win) {
      this.win = true;
    }
  }

  reset() {
    this.x = startingPosition[0];
    this.y = startingPosition[1];
  }

  render() {
    super.render();
    this.moving = false;
  }

  handleInput(input) {
    switch(input) {
      case 'left':
        this.x = this.x > 0 ? this.x - 1 : this.x;
        break;
      case 'right':
        this.x = this.x < 4 ? this.x + 1 : this.x;
        break;
      case 'up':
        this.y = this.y > 0 ? this.y - 1 : this.y;
        break;
      case 'down':
        this.y = this.y < 4 ? this.y + 1 : this.y;
    }
    this.moving = true;
  }
}
/* ----------=========== </Player Class> ===========---------- */



/* ----------=========== <Enemy Class> ===========---------- */
class Enemy extends Entity {
  constructor(x, y, h) {
    super();
    this.health = h;
    this.sprite += enemySprite;
    this.x = x;
    this.y = y;
  }
  update(dt) {
    super.update();
    if(this.isOutOfBoundsX) {
      this.x = -1;
    }
    else {
      this.x += dt;
    }
  }
  reset() {
    this.x = randInt(0, 4);
  }
}
/* ----------=========== </Enemy Class> ===========---------- */
