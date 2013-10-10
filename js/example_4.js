//Type in a name of color. Try red, blue, green, orange, pink, or even random
var PARTICLE_COLOR = "random";
var PARTICLE_SIZE = 10;
var VELOCITY_X_SEED = 20;
var VELOCITY_Y_SEED = 20;
var PARTICLES_PER_CYCLE = 2;
var GRAVITY = 1;

var FRAMES_PER_SECOND = 30;
var UPDATE_INTEVAL = 1000 / FRAMES_PER_SECOND;
var SEIZURE_MODE_ON = true;
var SEIZURE_INTERVAL = 2; // lower number is more flashes

// Particle Object
var Particle = function() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 5;
    this.color = "black";
    
    this.draw = function(ctx) {
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
    }
    return this;
}

// Point Object
var Point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

// Variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var STAGE_WIDTH;
var STAGE_HEIGHT;
var particles = [];
var spawnPoint;
var cnt = 0;

// Intialize particles and create timer
function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    STAGE_WIDTH = canvas.width;
    STAGE_HEIGHT = canvas.height;
    spawnPoint = new Point(STAGE_WIDTH * .5, STAGE_HEIGHT * .5)
}

// Clear canvas and draw particles
function draw() {
    ctx.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    var i = 0;
    var particle;
    for (i = 0; i < particles.length; i++) {
        particle = particles[i];
        particle.draw(ctx);
    }
}

// Update position and velocity of particles
function update() {
    var i = 0;
    var particle;
    // Update existing particles
    for (i = 0; i < particles.length; i++) {
        particle = particles[i];
        particle.vy += GRAVITY;
        particle.y += particle.vy;
        particle.x += particle.vx;
        
        if ((particle.y > STAGE_HEIGHT + particle.radius && GRAVITY > 0) ||
            (particle.y < 0 - particle.radius && GRAVITY < 0)) {
            //Remove Particle
            particles.splice(i, 1);
            particle = null;
        }
        
    }
    // SEIZURE MODE - for grabbing attention
    if(SEIZURE_MODE_ON) {
        cnt++;
        if(cnt % SEIZURE_INTERVAL == 0) {
            document.getElementById('body').style.background = getRandomColor();
        }
    }
    // Draw new particles
    for (i = 0; i < PARTICLES_PER_CYCLE; i++) {
        particle = createParticle();
        particles.push(particle);
    }
    draw();
}

// Create new particle
function createParticle()
{
    var particle = new Particle();
    particle.x = spawnPoint.x;
    particle.y = spawnPoint.y;
    particle.vx = Math.random() * VELOCITY_X_SEED - (VELOCITY_X_SEED / 2);
    particle.vy = Math.random() * -1 * VELOCITY_Y_SEED;
    particle.color = (PARTICLE_COLOR == "random")? getRandomColor() : PARTICLE_COLOR;
    particle.radius = PARTICLE_SIZE;
    return particle;
}

// Create Random Color
function getRandomColor() {
    return "#"+((1<<24)*Math.random()|0).toString(16);
}

init();
setInterval(update, UPDATE_INTEVAL);
