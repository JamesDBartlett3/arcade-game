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
}

class Player extends Entity {
  constructor() {
    super();
    this.x = 2;
    this.y = 4;
    // TODO: Allow user to select their own character sprite
    this.sprite += 'char-boy.png';
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
