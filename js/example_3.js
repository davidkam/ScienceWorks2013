// Setup canvas variables
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var STAGE_WIDTH = canvas.width;
var STAGE_HEIGHT = canvas.height;

// Setup initial variables for circle
var x = 0;
var y = 50;
var radius = 20;
var speed = 1;

// Update the position of the circle
function update() {
	x = x + speed;
	
	context.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
	drawCircle(x, y, radius);
}

// Draw Ball
function drawCircle(x, y, radius) {
	context.fillStyle = "blue"
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2);
	context.fill();
}

setInterval(update, 25);