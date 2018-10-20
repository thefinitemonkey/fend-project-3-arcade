// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 500;
    this.y = 70;
    this.speed = 5;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var collEnemyLeft = this.x;
    this.x += dt * this.speed;
    var collEnemyRight = this.x + 101;

    // Check if enemy has run off screen
    if (this.x > ctx.canvas.width) {
        var index = allEnemies.indexOf(this);
        if (index > -1) allEnemies.splice(index, 1);
    };

    // Check if enemy has collided with player
    var collPlayLeft = player.x;
    var collPlayRight = player.x + 101;
    if (collPlayLeft + 20 > collEnemyRight || collEnemyLeft + 20 > collPlayRight) return;
    if (this.y !== player.y) return;
    // There's a collision at this point, so bump the player back to the starting position
    console.log("collision");
    player = new Player();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png'
    this.x = 200;
    this.y = 402;
    this.winner = false;
    this.shownWin = false;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y === -13) {
        this.winner = true;
    }
};

Player.prototype.handleInput = function (keyCode) {
    // Make sure game is active
    if (this.winner) return;

    // Change position based on key press
    switch (keyCode) {
        case "left": {
        this.x -= 101;
            break;
        }
        case "right": {
            this.x += 101;
            break;
        }
        case "up": {
            this.y -= 83;
            break;
        }
        case "down": {
            this.y += 83;
            break;
        }
    }
    // Keep player within boundaries
    if (this.x > 400) this.x = 400;
    if (this.x < 0) this.x = 0;
    if (this.y > 402) this.y = 402;
    if (this.y < -13) this.y = -13;
}

Player.prototype.update = function () {
    // Check if player has won
    if (this.winner && !this.shownWin) {
        this.shownWin = true;
        allEnemies = [];
        window.confirm("Winner winner chicken dinner! Play again?") ? player = new Player() : this.winner = true;
    }

    // Check to see if an enemy will be randomly placed on screen
    // Never more than 10, never less than 3
    if (allEnemies.length >= 10) return;
    var rand = Math.floor(Math.random() * 50);
    if ((rand === 49 || allEnemies.length < 4) && !this.winner) {
        var enemy = new Enemy();
        // Which row?
        row = Math.floor(Math.random() * 4);
        enemy.y = 70 + (83 * row);
        enemy.x = -100;
        // How fast?
        enemy.speed = Math.floor(Math.random() * 3) * 40 + 150;

        allEnemies.push(enemy);
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
