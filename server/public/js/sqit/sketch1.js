$("#presser").on("click", () => {
  console.log("Hi", anim);
  anim = true;
  console.log($("#editor").width());
});

// Ace Text-editor

let extraText = false;
const realWidth = (percent) => ($(window).width() / 100) * percent;

let editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");

editor.setShowPrintMargin(false);
editor.setOption({
  wrap: true,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  behavioursEnabled: true,
  hScrollBarAlwaysVisible: false,
  vScrollBarAlwaysVisible: false,
});

editor.commands.addCommand({
  name: "...",
  exec: function () {
    if (!extraText) {
      add_editor_text();
      extraText = true;
    }
    anim = !anim;
  },
  bindKey: { mac: "cmd-enter", win: "ctrl-enter" },
});

$("#editor").width(realWidth(90));
$("#editor").height("50vh");

let editor2 = ace.edit("editor2");
editor2.setTheme("ace/theme/monokai");
editor2.session.setMode("ace/mode/javascript");
editor2.session.setUseWorker(false);

editor2.setOption({
  wrap: true,
  highlightActiveLine: false,
  highlightGutterLine: false,
  hScrollBarAlwaysVisible: false,
  vScrollBarAlwaysVisible: false,
});
editor2.setShowPrintMargin(false);
editor2.renderer.$cursorLayer.element.style.display = "none";
editor2.setReadOnly(true);

$("#editor2").width(realWidth(90));
$("#editor2").height("5vh");

// P5 Animations

const add_editor_text = () => {
  let str = editor.getValue();
  editor.setValue(
    str +
      `\n\n// Sikes, please click the green light for 2 seconds to open the door.\nlet interval = 4`
  );
};

const vh_2_px = (vh, height = true) =>
  $(window)[height ? "height" : "width"]() * (vh / 100);

let on, anim, finished;

let fps = 60;
let interval = 180;
let radius = 50;
let push = 0;

let redLight, greenLight, doors;
let redCnt = (greenCnt = 0);


function setup() {
  let cnv = createCanvas(realWidth(90), vh_2_px(50));
  cnv.parent("canvasHolder");
  frameRate(fps);
  textAlign(CENTER, CENTER)

  redLight = new BlinkLight(width / 3, height / 2, radius * 2, [255, 0, 0], 1);
  greenLight = new BlinkLight(
    (width / 3) * 2,
    height / 2,
    radius * 2,
    [0, 255, 0]
  );
  backgroundDoors = new SlidingDoors($(":root").css("--color-navy-800"));
  doors = new SlidingDoors($(":root").css("--GuardRed"));

  textFont("Montserrat")
  
  textSize(50)
}

function draw() {
  background($(":root").css("--CardBrown"));

  fill($(":root").css("--GuardRed"))
  noStroke()
  textStyle(BOLDITALIC)
  text("YOU DID IT", width/2, height/2)
  textStyle(BOLD)
  text("🎉", width/2, height/2 + 50)

  stroke($(":root").css("--color-navy-800"));
  backgroundDoors.show();
  if (finished) backgroundDoors.move(finished);

  // Strobing lights
  if (on) {
    greenCnt = 0;
    redLight.show();
  } else {
    redCnt = 0;
    greenLight.show();
  }
  if (redLight.isPressed()) redCnt++;
  if (greenLight.isPressed()) greenCnt++;

  if (redCnt / fps > 2) console.log("Länger als 2 sec");
  if (greenCnt / fps > 2) finished = true;

  stroke(0);
  strokeWeight(1);
  doors.show();
  doors.move(anim);

  if (finished) push++;
  if (frameCount % interval == 0) on = !on;

}

// function mousePressed(){
//     push++
// }

function windowResized() {
  resizeCanvas(realWidth(90), vh_2_px(50));
}

class SlidingDoors {
  constructor(color) {
    this.col = color;
    this.push = 0;
  }

  show() {
    fill(this.col);
    rect(-5 - this.push, 0, width / 2 + 5, height);

    fill(this.col);
    rect(width / 2 + this.push, 0, width / 2 + 5, height);
  }

  move(anim) {
    if (anim) {
      this.push = this.push < width / 2 ? this.push + 1 : width / 2;
    } else {
      if (this.push > 0) this.push--;
    }
  }
}

class BlinkLight {
  constructor(x, y, r, color, push = -1) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = color;
    this.push = push;
  }

  show() {
    noStroke();
    fill(this.col);
    circle(this.x - push * this.push, this.y, this.r * 2);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  isClicked() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.r) return true;
    return false;
  }

  isPressed() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.r && mouseIsPressed)
      return true;
    return false;
  }
}

// for (let i = 0; i < radius; i++) {
//   fill(255, 0, 0, i);
//   circle(-(width / 2) / 2, 0, radius - i);
// }
