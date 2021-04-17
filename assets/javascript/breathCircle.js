//let canvas take the entire width/height of window 
let canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// set window height to match the window on device
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// set canvas width/height
canvas.height = window_height;
canvas.width = window_width;

// **************** attempt to center canvas **********************
// canvas.height = window_height/2;
// canvas.width = window_width/2;

// set backgroundColor to something neutral
canvas.style.backgroundColor = '#f0f8ff';

// create object to use for breath image
class Circle{
    constructor(x_point, y_point, radius, color) {
    this.x_point = x_point;
    this.y_point = y_point;
    this.radius = radius;
    this.color = color;
}
    // draw breath circle function 
    draw(context) {
        context.beginPath();
        // canvas function to create circles/arcs.
        context.arc(this.x_point, this.y_point, this.radius, 0, Math.PI * 2, false);
        // blue is used for it's association with calm
        context.strokeStyle ='#0da2ff';
        context.lineWidth = 15;
        context.fillStyle = this.color;
        context.fill();
        context.stroke();
        context.closePath();
        // context.centerObjects();
    }
}

// add in preferred values for breath circle
let circle = new Circle(400, 400, 100, '#0da2ff');
circle.draw(context);