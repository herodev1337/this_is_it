// Worker imports
import { createEditor, EditorSingleton } from "../editor.js";
import { SlidingDoors, BlinkLight } from "./classes.js"
import * as helpers from "../helpers.js";


console.log($(window).height())

let extraText = false;
const enterCallback = () => {
  if (!helpers.get_validation(mainEditor.editor.getValue(), "open", "gate")) {
    anim = false;
    return;
  } else anim = true;

  if (!extraText) {
    add_editor_text();
    extraText = true;
  }

  interval = helpers.get_userCode(mainEditor.editor.getValue(), "interval");
};

const add_editor_text = () => {
  let str = mainEditor.editor.getValue();
  mainEditor.editor.setValue(
    str +
      `\n\n// Sikes, please click the green light for 2 seconds to open the door.\nlet interval = 4`
  );
};

const mainEditor = new EditorSingleton();
mainEditor.enterCallback(enterCallback)



// P5 Animations
let on, anim, finished;

let fps = 60;
let interval = 4;
let radius = 50;

let redLight, greenLight, doors, backgroundDoors;
let redCnt = 0;
let greenCnt = 0;

function setup() {
  let cnv = createCanvas(helpers.realWidth(90), helpers.view_2_px(50));
  cnv.parent("canvasHolder");
  frameRate(fps);
  textAlign(CENTER, CENTER);

  redLight = new BlinkLight(width / 3, height / 2, radius * 2, [255, 0, 0], 1);
  greenLight = new BlinkLight(
    (width / 3) * 2,
    height / 2,
    radius * 2,
    [0, 255, 0]
  );
  backgroundDoors = new SlidingDoors($(":root").css("--color-navy-800"));
  doors = new SlidingDoors($(":root").css("--GuardRed"));

  textFont("Montserrat");
  textSize(50);
}

function draw() {
  background($(":root").css("--CardBrown"));

  fill($(":root").css("--GuardRed"));
  noStroke();
  textStyle(BOLDITALIC);
  text("YOU DID IT", width / 2, height / 2);
  textStyle(BOLD);
  text("🎉", width / 2, height / 2 + 75);

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

  if (redCnt / fps > 2) console.log("Sry nicht der richtig mouse click :/");
  if (greenCnt / fps > 2) finished = true;

  // Sliding doors
  stroke(0);
  strokeWeight(1);
  doors.show();
  doors.move(anim);

  if (finished) {
    redLight.move();
    greenLight.move();
  }
  if (frameCount % interval == 0) on = !on;
}

function windowResized() {
  resizeCanvas(helpers.realWidth(90), helpers.view_2_px(50));
}

// for (let i = 0; i < radius; i++) {
//   fill(255, 0, 0, i);
//   circle(-(width / 2) / 2, 0, radius - i);
// }

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;