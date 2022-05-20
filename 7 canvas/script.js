let canvas = document.getElementById('canva');
let ctx = canvas.getContext('2d');
//Make canvas fill whole screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Background color in canvas = light blue
ctx.fillStyle = '#00ffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Big green circles to make the background
ctx.fillStyle = '#00ff00';
ctx.beginPath();
ctx.arc(canvas.width / 2 - 500, canvas.height + 500, canvas.width / 2, 0, Math.PI * 2, false);
ctx.fill();

ctx.beginPath();
ctx.arc(canvas.width / 2 + 500, canvas.height + 500, canvas.width / 2, 0, Math.PI * 2, false);
ctx.fill();


// Draw dark green rectangle in the bottom
ctx.fillStyle = '#006400';
ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

let arr = ctx.getImageData(0, 0, canvas.width, canvas.height);

//Iterate and find if color is #00ff00 then add x and y coordinates to array
let arr2 = [];
for (let i = 0; i < arr.data.length; i += 4) {
    if (arr.data[i] === 0 && arr.data[i + 1] === 255 && arr.data[i + 2] === 0) {
        if (Math.random() < 0.0001) {
            arr2.push({
            x: i % (canvas.width * 4) / 4,
            y: Math.floor(i / (canvas.width * 4))
        });
        }
    }
}
arr2.forEach(coord => {
    // Get pixel data

    let pixel = ctx.getImageData(coord.x-5, coord.y- 40, 1, 1);
    // If pixel color is not green then return
    if (pixel.data[0] !== 0 || pixel.data[1] !== 255 || pixel.data[2] !== 0) {
        return;
    }
    // Draw a brown rectangle
    ctx.fillStyle = '#a52a2a';
    ctx.fillRect(coord.x-5 , coord.y - 40, 5, 20);
    // Draw dark green triangle
    ctx.fillStyle = '#006400';
    ctx.beginPath();
    ctx.moveTo(coord.x - 15, coord.y - 30);
    ctx.lineTo(coord.x - 3 , coord.y - 50);
    ctx.lineTo(coord.x + 10, coord.y - 30);  
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(coord.x - 15, coord.y - 40);
    ctx.lineTo(coord.x - 3 , coord.y - 60);
    ctx.lineTo(coord.x + 10, coord.y - 40);  
    ctx.fill();

})
// Draw a red rectangle on left side higher than the green rectangle
ctx.fillStyle = '#ff0000';
ctx.fillRect(10, canvas.height - 250, 200, 200);


// Draw a blue rectangle on right side higher than the green rectangle
ctx.fillStyle = '#0000ff';
ctx.fillRect(canvas.width - 210, canvas.height - 250, 200, 200);

// Draw a yellow triangle on the left side
ctx.fillStyle = '#ffff00';
ctx.beginPath();
ctx.moveTo(10, canvas.height - 250);
ctx.lineTo(210, canvas.height - 250);
ctx.lineTo(115, canvas.height - 350);
ctx.fill();

// Draw the same triangle on right side
ctx.fillStyle = '#ffff00';
ctx.beginPath();
ctx.moveTo(canvas.width - 210, canvas.height - 250);
ctx.lineTo(canvas.width - 115, canvas.height - 350);
ctx.lineTo(canvas.width - 10, canvas.height - 250);
ctx.fill();


// Draw a sun in right upper corner
ctx.fillStyle = '#ffff00';
ctx.beginPath();
ctx.arc(canvas.width - 70, 70, 50, 0, Math.PI * 2, false);
ctx.fill();


// Draw brown rectangles in the middle of red and blue rectangles
ctx.fillStyle = '#a52a2a';
ctx.fillRect(90, canvas.height - 120, 40, 70);

// Draw the same rectangle in blue rectangle
ctx.fillStyle = '#a52a2a';
ctx.fillRect(canvas.width - 130, canvas.height - 120, 40, 70);

// Draw white clouds in upper middle
ctx.fillStyle = '#ffffff';

// For loop 4 times
let cloudIntensity = 20
for (let y = 0; y < cloudIntensity; y++) {
    let pos = Math.floor(Math.random() * canvas.width)
    let randz = Math.floor(Math.random()* 10)
for (let z = 0; z < randz; z++) {
    let randi = Math.floor(Math.random() * 10)
    randi = (randi > 5) ? randi : 5;
    for (let i = 0; i < randi; i++) {
    ctx.beginPath();
    ctx.arc(pos + (10 - randi) * 10 + i * 20, 50 + (10-randz)* 10 + z * 20, 20, 0, Math.PI * 2, false);
    ctx.fill();
    }
}

}

//Iterate and find if color is #006400 then add x and y coordinates to array
let arr3 = [];
for (let i = 0; i < arr.data.length; i += 4) {
    if (arr.data[i] === 0 && arr.data[i + 1] === 100 && arr.data[i + 2] === 0) {
        if (Math.random() < 0.005) {
            arr3.push({
            x: i % (canvas.width * 4) / 4,
            y: Math.floor(i / (canvas.width * 4))
        });
        }
    }
}

arr3.forEach(coord => {
    // Get pixel data


    // Draw a green rectangle
    ctx.fillStyle = '#00cc00';
    ctx.fillRect(coord.x-5 , coord.y - 20, 5, 20);

})