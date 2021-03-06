'use strict';

let modal = document.querySelector('.modal');
let close = document.querySelector('.close');
let again = document.querySelector('.play-again');
let points = 0;
let pointsCount = document.querySelector('.points');

/*
 * Enemy section
 */

// Enemies our player must avoid
class Enemy {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (350 - 100) + 100);
    this.sprite = 'images/enemy-bug.png';
  }

// Update the enemy's position
// Parameter: dt, a time delta between ticks
  update(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Make enemies go to the left side of canvas after reaching
    // the right end of canvas
    if (this.x >= 500) {
      this.x = -100;
    }

    // Check for collision with enemies and walls
    checkCollision(this);
  }

// Draw the enemy on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

/*
 * Player section
 */

class Player {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';
  }

  update(dt) {
    winGame(this);
  }

  // Draws the player on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // enable player to move - method for arrow keys
  handleInput(keyPress) {
    switch(keyPress) {
      case 'left':
        if (this.x - 100 < 0) {
          this.x = 0;
        } else {
          this.x -= 100;
        }
        console.log('left');
        break;

      case 'right':
        if (this.x + 100 > 400) {
          this.x = 400;
        } else {
          this.x += 100;
        }
        console.log('right');
        break;

        case 'down':
          if (this.y + 80 > 400) {
            this.y = 400;
          } else {
            this.y += 80;
          }
          console.log('down');
          break;

        case 'up':
          if (this.y - 80 < 0) {
            resetPlayer();
            points++;
            pointsCount.innerHTML = points;
          } else {
            this.y -= 80;
          }
          console.log('up');
    }
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*
 * Objects section
 */

// Instantiate all objects
let enemy1 = new Enemy(-50, 60);
let enemy2 = new Enemy(-100, 145);
let enemy3 = new Enemy(-150, 230);
let allEnemies = [enemy1, enemy2, enemy3];
let player = new Player(200, 400);

// reset player
function resetPlayer() {
  setTimeout(function() {
    player.x = 200;
    player.y = 400;
  }, 100);
}

// check for collision between enemy and player
function checkCollision(oneEnemy) {
  if (
    player.x < oneEnemy.x + 80 &&
    player.x + 80 > oneEnemy.x &&
    player.y < oneEnemy.y + 60 &&
    60 + player.y > oneEnemy.y) {
      resetPlayer();
      console.log('collision');
      points = 0;
      pointsCount.innerHTML = points;
    }
}

function winGame() {
  if (points === 5) {
    //shows congratulations popup window
    modal.style.display = "block";
    playAgain();
    closePopUp();
  }
}

// close popup window, start new game
function closePopUp() {
  close.addEventListener('click', function(event) {
    modal.style.display = "none";
    points = 0;
    pointsCount.innerHTML = points;
    resetPlayer();
  });
}

// start new game (play again button)
function playAgain() {
  again.addEventListener('click', function(event) {
     modal.style.display = "none";
     points = 0;
     pointsCount.innerHTML = points;
     resetPlayer();
  });
}
