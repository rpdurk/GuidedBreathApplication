/* important! for alignment, you should make things
 * relative to the canvas' current width/height.
 */
function draw() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    // ctx.canvas.setAttribute("id", "myCanvas");

    // let canvas = document.createElement("canvas");
    // canvas.setAttribute("id", "myCanvas");
}