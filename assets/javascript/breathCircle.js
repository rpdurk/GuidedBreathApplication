const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
//using radius of canvas, thus it can be adjusted based on screen being used.
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
drawClock();

function drawClock() {
    ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}