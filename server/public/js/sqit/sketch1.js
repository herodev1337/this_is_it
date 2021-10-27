// import * as $ from "../../../../node_modules/jquery/dist/jquery.slim.js"

let on, anim;
let interval = 60;
let radius = 50;

let push = 0;

function setup() {
  let cnv = createCanvas($(window).width(), 400);
  cnv.parent("canvasHolder")
  frameRate(60);
}

function draw() {
  background(220);

  translate(width / 2, height / 2);
  noStroke();

  // Strobing lights
  if (on) {
    fill(255, 0, 0);
    circle(-(width / 2) / 2, 0, radius * 2);
  } else {
    fill(0, 255, 0);
    circle(width / 2 / 2, 0, radius * 2);
  }

  // Sliding doors
  fill(245);
  rect(0 + push, -height / 2, width, height);

  fill(125);
  rect(0 - push, -height / 2, -width, height);
  
  if (anim) push++;

  if (frameCount % interval == 0) on = !on;
}