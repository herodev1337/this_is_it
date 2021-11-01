import { createEditor, EditorSingleton } from "./editor.js";
import * as helpers from "./helpers.js";


$("#presser").on("click", () => {
    console.log("Hi", anim);
    anim = true;
});

// Ace Editor setup

let extraText = false

const enterCallback = () => {
    if (!extraText) {
        add_editor_text();
        extraText = true;

        // circles = newCircle(7)
        valid = true
    }
};
const add_editor_text = () => {
    let str = mainEditor.editor.getValue();
    mainEditor.editor.setValue(
        str +
        `\n\n// Yout got some talent.`
    );
    let strout = mainEditor.editor2.getValue()
};

const mainEditor = new EditorSingleton();
mainEditor.enterCallback(enterCallback)

// P5 Animations

let on, anim;

let interval = 10;
let radius = 50;
let push = 0;

let valid = false;
let circles;

function setup() {
    let cnv = createCanvas(helpers.realWidth(90), helpers.view_2_px(50));
    cnv.parent("canvasHolder");
    ellipseMode(CENTER)
    //let cnvInner = createCanvas($(window).width(), 400);
    // cnv.parent("canvasHolder");
   // $("#defaultCanvas0").append(cnvInner)

    frameRate(60);
}

function draw() {
    // console.log(valid)
    background($(":root").css("--color-navy-800"));
    fill(255)

    rect(width/2 -50,height/2 -125,5,250)
    rect(width/2 +50,height/2 -125,5,250)
    stroke(255)
    //strokeWeight(5)
    line(width/2 -25, height/2 -25, width/2 +30, height/2 +30)
    line(width/2 +30 , height/2 -25, width/2 -25, height/2 +30)

    line(width/2 -70, height/2 -25, width/2 -120, height/2 +30)
    line(width/2 -120, height/2 -25, width/2 -70, height/2 +30)

    //line(width/2 +50, height/2 -50, width/2 -100, height/2 +100)

    rect(width/2 -125,height/2 +50,250,5)
    rect(width/2 -125,height/2 -50,250,5)


    noFill()
    circle(width/2 -100 ,height/2 + 100,50)
    circle(width/2 +100 ,height/2 + 100,50)

    if(valid) {
        let circles = newCircle(7)
        circle(circles[0], circles[1], circles[2])
        // console.log("yes")
    }
}


// Board states

function newCross(position){
    if(position === 0){

    }
    if(position === 1){

    }
    if(position === 2){

    }
    if(position === 3){
        line(width/2 -70, height/2 -25, width/2 -120, height/2 +30)
        line(width/2 -120, height/2 -25, width/2 -70, height/2 +30)
    }
    if(position === 4){
        line(width/2 -25, height/2 -25, width/2 +30, height/2 +30)
        line(width/2 +30 , height/2 -25, width/2 -25, height/2 +30)
    }
    if(position === 5){

    }
    if(position === 6){

    }
    if(position === 7){

    }
    if(position === 8){

    }
    else{
        console.log("Enter valid field-number")
    }

}

function newCircle(position){
    let checkPosition = checkPostionCircle()
    if(position === 0){
        circle0 = [width/2 -100,height/2 - 100,50]
        checkPosition[0] = true
        return circle0
    }
    if(position === 1){
        circle1 = [width/2,height/2 + 100,50]
        checkPosition[1] = true
        return circle1

    }
    if(position === 2){
        circle2 = [width/2 +100 ,height/2 -100,50]
        checkPosition[2] = true
        return circle2

    }
    if(position === 3){
        circle3 = [width/2 -100 ,height/2,50]
        checkPosition[3] = true
        return circle3

    }
    if(position === 4){
        circle = [width/2 ,height/2 - 100,50]
        checkPosition[4] = true
        return circle4

    }
    if(position === 5){
        circle5 = [width/2 +100 ,height/2 - 100,50]
        checkPosition[5] = true
        return circle5

    }
    if(position === 6){
        circle6 = [width/2 -100 ,height/2 + 100,50]
        checkPosition[6] = true
        return circle6

    }
    if(position === 7){
        let circle7 = [width/2,height/2 + 100,50]
        checkPosition[7] = true
        return circle7

    }
    if(position === 8){
        circle8 = [width/2 +100 ,height/2 + 100,50]
        checkPosition[8] = true
        return circle8

    }

}

function checkPostionCircle(){
    var checkPosition = [false, false, false ,false ,false ,false ,true, false ,true]

    return checkPosition
}



function simpleTicTacToe(){
    let checkPosition = checkPostionCircle()
    //checking cycle Position
    //horizontal
    if(checkPosition[0] && checkPosition[1]){

    }
    if(checkPosition[3] && checkPosition[4]){

    }
    if(checkPosition[6] && checkPosition[7]){

    }
    if(checkPosition[1] && checkPosition[2]){

    }
    if(checkPosition[4] && checkPosition[5]){

    }
    if(checkPosition[7] && checkPosition[8]){

    }
    if(checkPosition[0] && checkPosition[2]){

    }
    if(checkPosition[3] && checkPosition[5]){

    }
    if(checkPosition[6] && checkPosition[8]){

    }

    //vertical
    if(checkPosition[0] && checkPosition[3]){

    }
    if(checkPosition[1] && checkPosition[4]){

    }
    if(checkPosition[2] && checkPosition[5]){

    }
    if(checkPosition[6] && checkPosition[3]){

    }
    if(checkPosition[7] && checkPosition[4]){

    }
    if(checkPosition[8] && checkPosition[5]){

    }
    if(checkPosition[0] && checkPosition[6]){

    }
    if(checkPosition[1] && checkPosition[7]){

    }
    if(checkPosition[2] && checkPosition[8]){

    }

    // diagonal

    if(checkPosition[0] && checkPosition[4]){

    }
    if(checkPosition[8] && checkPosition[4]){

    }
    if(checkPosition[0] && checkPosition[8]){

    }
}

function windowResized() {
    resizeCanvas(helpers.realWidth(90), helpers.view_2_px(50));
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;