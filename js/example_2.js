// Setup canvas variables
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Draw Circle
function drawCircle(x, y, radius) {
	context.fillStyle = "blue"
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2);
	context.fill();
}

drawCircle(50, 50, 10);

drawCircle(20, 200, 15);

drawCircle(300, 60, 20);