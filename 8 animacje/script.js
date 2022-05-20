let canvas = document.getElementById('canva');
let ctx = canvas.getContext('2d');
//Make canvas fill whole screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FPS = 60

let prop = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    velocityx: 0,
    velocityy: 0,
    radius: 100,
    color: '#00ff00'
}
var clicked = false
var mouseX = 0
var mouseY = 0

setInterval(() => {
    // When clicked drag prop with mouse
    canvas.addEventListener('mousedown', (e) => {
        if (Math.pow(prop.x - mouseX, 2) + Math.pow(prop.y - mouseY, 2) < Math.pow(prop.radius, 2)) {
            clicked = true
        }
    })
    canvas.addEventListener('mouseup', (e) => {
        clicked = false
    })
    canvas.addEventListener("mouseleave", (e) => {
        clicked = false
    })
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
    })

    // Calculate mouse velocities
    if (clicked) {
        //Check if mouse is in circle
        prop.velocityx = (mouseX - prop.x) / 10
        prop.velocityy = (mouseY - prop.y) / 10
    }

    // When clicked drag prop with mouse


    // Calculate position based on velocity
    prop.x += prop.velocityx;
    prop.y += prop.velocityy;

    // Reduce velocity over time
    prop.velocityx *= 0.99;
    prop.velocityy *= 0.99;

    // Gravity
    prop.velocityy += 0.2;

    // Bounce off walls
    if (prop.x + prop.radius > canvas.width || prop.x - prop.radius < 0) {
        prop.velocityx = -prop.velocityx * 0.9;
        prop.x += prop.velocityx;
    }
    if (prop.y + prop.radius > canvas.height || prop.y - prop.radius < 0) {
        prop.velocityy = -prop.velocityy * 0.7;

        prop.y += prop.velocityy;
        
        // Check if velocityx and velocityy is near zero and make it zero
        
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circle
    ctx.beginPath();
    ctx.arc(prop.x, prop.y, prop.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = prop.color;
    ctx.fill();
    ctx.closePath();

    // Draw line
    ctx.beginPath();
    ctx.moveTo(prop.x, prop.y);
    ctx.lineTo(prop.x + prop.radius, prop.y);
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
    ctx.closePath();



}, 1000 / FPS);