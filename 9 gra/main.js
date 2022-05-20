const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// Make canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Make black background
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Default consts
const FPS = 60;
const speed = 10

let keystate = {}
// Ball class
class Ball {
    constructor(x, y, radius, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.throwing = 0
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    update(player1, player2) {
        this.draw();
        if (this.throwing != 0) {
            if (this.throwing == 1) {
                ball.x = player1.x + 30;
                ball.y = player1.y + player1.height / 2;
                return
            }
            if (this.throwing == 2) {
                ball.x = player2.x - 30;
                ball.y = player2.y + player2.height / 2;
                return
            }
        }
        this.checkBounds(player1, player2);
        this.x += this.speedX;
        this.y += this.speedY;
    }

    // Check if ball is out of bounds
    checkBounds(player1, player2) {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.speedX = -this.speedX;
            if (this.x - this.radius < 0) {
                player2.score++;
                this.throwing = 1
                player1.ballThrow = 1
            }
            if (this.x + this.radius > canvas.width) {
                player1.score++;
                this.throwing = 2
                player2.ballThrow = 1
            }
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.speedY = -this.speedY;
        }
    }

    // bounce when hitting the paddle
    checkCollision(paddle) {
        if (this.x + this.radius > paddle.x && this.x - this.radius < paddle.x + paddle.width) {
            if (this.y + this.radius > paddle.y && this.y - this.radius < paddle.y + paddle.height) {
                this.speedX = -this.speedX;
            }
        }
    }


    // Reset ball
    reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.speedX = this.speedX;
        this.speedY = this.speedY;
        this.throwing = 0
    }
}

// Player class
class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.score = 0;
        this.ballThrow = 0
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
        }

        if (this.y < 0) {
            this.y = 0;
        }
        this.draw();
    }

    increaseScore() {

        this.score++;
    }

    resetScore() {
        this.score = 0;
    }

    reset() {
        this.y = canvas.height / 2;
        this.ballThrow = 0
    }

    move(direction) {
        this.y += direction;
    }

    getScore() {
        return this.score;
    }

    getY() {
        return this.y;
    }

    throwBall(ball) {
        if (this.ballThrow === 1) {
            console.log(ball.throwing)
            if (ball.throwing == 1) {
                ball.x = this.x + 30;
                ball.y = this.y + this.height / 2;
                ball.speedX = ball.speedX;
                ball.speedY = ball.speedY;
            } else {
                ball.x = this.x - 30;
                ball.y = this.y + this.height / 2;
                ball.speedX = ball.speedX;
                ball.speedY = ball.speedY;
            }
            this.ballThrow = 0;
        }
    }
}

const player1 = new Player(70, canvas.height / 2, 10, 100, '#fff');
const player2 = new Player(canvas.width - 80, canvas.height / 2, 10, 100, '#fff');
const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, '#fff', 5, 5);



// Frame drawing
function draw() {
    ctx.fillStyle = '#000';


    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (keystate[38]) {
        player2.move(-speed);
    }
    if (keystate[40]) {
        player2.move(speed);
    }
    if (keystate[68]) {
        if (ball.throwing == 1) {

            player1.throwBall(ball);
            ball.throwing = 0
        }
    }
    if (keystate[37]) {
        if (ball.throwing == 2) {

            player2.throwBall(ball)
            ball.throwing = 0
        }
    }
    if (keystate[87]) {
        player1.move(-speed);
    }
    if (keystate[83]) {
        player1.move(speed);
    }
    if (keystate[27]) {
        if (interval) {
            clearInterval(interval);
            interval = null;
        } else {
            interval = setInterval(draw, 1000 / FPS);
        }
    }
    if (keystate[82]) {
        player1.resetScore();
        player2.resetScore();
        ball.reset();
    }
    player1.update()
    player2.update()


    ball.update(player1, player2)
    ball.checkCollision(player1)
    ball.checkCollision(player2)

    // Draw scores on top
    ctx.font = '30px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(player1.getScore(), canvas.width / 4, 50);
    ctx.fillText(player2.getScore(), canvas.width - canvas.width / 4, 50);
}

let interval = setInterval(draw, 1000 / FPS);



// Player 1 controls
// Arrow up = -5
// Arrow down = 5
// Arrow right = throw ball
// Player 2 controls
// W = -5
// S = 5
// A = throw ball
// Space = start game
// Esc = pause game
// R = reset game
// Make the movement smooth

window.addEventListener('keydown', function (e) {
    keystate[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function (e) {
    keystate[e.keyCode || e.which] = false;
}, true);