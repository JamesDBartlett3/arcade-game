/* ===================================================== *\
| ES6 / OOP "Class-Based" JavaScript Implementation
|
| The following code is based on the ZOOM webinar
| hosted by Rodrick Bloomfield on June 21st, 2018
| (Video link @ http://tiny.cc/ArcadeGameCloneProject)
| @Rodrick [FEND] on Slack (gwgnanodegrees.slack.com)
| @bloom305 on GitHub (https://github.com/bloom305)
|
| 
\* ===================================================== */

class Entity {
  constructor() {
    this.sprite = 'images/';
    this.x = 0;
    this.y = 0;
  }
  update(dt) {
    this.isOutOfBoundsX = this.x > 5;
    this.isOutOfBoundsY = this.y < 1;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y * 82)-20);
  }

  checkCollisions(playerOrEnemy) {
    if(this.y === playerOrEnemy.y) {
      if(this.x >= playerOrEnemy.x - collisionProximity && this.x <= playerOrEnemy.x + collisionProximity) {
        return true;
      }
    }
    else {
      return false;
    }
  }
}

class Player extends Entity {
  constructor() {
    super();
    this.x = startingPosition[0];
    this.y = startingPosition[1];
    // TODO: Allow user to select their own character sprite
    this.sprite += 'char-boy.png';
    this.moving = false;
    this.win = false;
  }

  update(dt) {
    super.update();
    if(this.isOutOfBoundsY && !this.moving && !this.win) {
      playerScore ++;
      console.log('Your score: ' + playerScore);
      alert('Win!');
      this.win = true;
    }
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

class Enemy extends Entity {
  constructor(x, y) {
    super();
    this.sprite += 'enemy-bug.png';
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
}
