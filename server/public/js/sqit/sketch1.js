let on, anim;

let interval = 10;
let radius = 50;
let push = 0;

$("#presser").on("click", () => {
  console.log("Hi", anim);
  anim = true;
  console.log($("#editor").width())
});

let editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");

editor.setShowPrintMargin(false);
editor.setOption({
  wrap: true,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  behavioursEnabled: true,
});

editor.commands.addCommand({
  name: "...",
  exec: function () {
    console.log(editor.getValue());
  },
  bindKey: { mac: "cmd-enter", win: "ctrl-enter" },
});

$("#editor").height("50vh");

let editor2 = ace.edit("editor2");
editor2.setTheme("ace/theme/monokai");
editor2.session.setMode("ace/mode/javascript");

editor2.setOption({
  wrap: true,
  highlightActiveLine: false,
  highlightGutterLine: false,
});
editor2.setShowPrintMargin(false);
editor2.renderer.$cursorLayer.element.style.display = "none";
editor2.setReadOnly(true);
$("#editor2").height("5vh");


$(window).on("load", ()=> console.log("hi", $(window).width()))

console.log($(window).width())
console.log(window.innerWidth, window.outerWidth)

function setup() {
  // console.log($("#canvasHolder").width())
  // console.log($("#editor").width()) 
  // console.log((window.innerWidth-$(window).width()))
  // console.log($(window).width())
  // console.log(window.innerWidth)


  let cnv = createCanvas($(window).width(), 400);
  cnv.parent("canvasHolder");
  frameRate(60);
}

function draw() {
  background($(":root").css("--color-navy-800"));

  translate(width / 2, height / 2);
  noStroke();

  // Strobing lights
  if (on) {
    fill(255, 0, 0);
    circle(-(width / 2) / 3, 0, radius * 2);
  } else {
    fill(0, 255, 0);
    circle(width / 2 / 3, 0, radius * 2);
  }

  // Sliding doors
  stroke(0);
  strokeWeight(1);
  fill($(":root").css("--GuardRed"));
  rect(0 + push, -height / 2, width, height);

  fill($(":root").css("--GuardRed"));
  rect(0 - push, -height / 2, -width, height);

  if (anim) push++;

  if (frameCount % interval == 0) on = !on;
}



// for (let i = 0; i < radius; i++) {
//   fill(255, 0, 0, i);
//   circle(-(width / 2) / 2, 0, radius - i);
// }
