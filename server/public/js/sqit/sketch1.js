// import * as $ from "../../../../node_modules/jquery/dist/jquery.slim.js"

let on, anim;

let interval = 10;
let radius = 50;
let push = 0;

$("#presser").on("click", () => {
  console.log("Hi", anim);
  anim = true;
});

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setOption({wrap:true});

$("#editor").height("50vh")

// function setup() {
//   let cnv = createCanvas($(window).width(), 400);
//   cnv.parent("canvasHolder");
//   frameRate(60);
// }

// function draw() {
//   background($(":root").css("--color-navy-800"));

//   translate(width / 2, height / 2);
//   noStroke();

//   // Strobing lights
//   if (on) {
//     fill(255, 0, 0);
//     circle(-(width / 2) / 3, 0, radius * 2);
//   } else {
//     fill(0, 255, 0);
//     circle(width / 2 / 3, 0, radius * 2);
//   }

//   // Sliding doors
//   stroke(0);
//   strokeWeight(1);
//   fill($(":root").css("--GuardRed"));
//   rect(0 + push, -height / 2, width, height);

//   fill($(":root").css("--GuardRed"));
//   rect(0 - push, -height / 2, -width, height);

//   if (anim) push++;

//   if (frameCount % interval == 0) on = !on;
// }

// for (let i = 0; i < radius; i++){
//   fill(255, 0, 0, i);
//   circle(-(width / 2) / 2, 0, radius-i);
// }
