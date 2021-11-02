// Lib imports
import $ from 'jquery';
import p5 from 'p5';

import { EditorSingleton } from '../editor.js';
import * as helpers from '../helpers.js';
import { fields } from "./tictactoe.js"



$("#presser").on("click", () => {
    console.log("Hi", anim);
    anim = true;
});

// Ace Editor setup

let extraText = false
let gameFinished = false
let fields__ = ""
let yourTurn = true


const enterCallback = () => {
    if (!extraText) {
        const fields_ = helpers.get_userCode(mainEditor.editor.getValue(), "fields")
        fields__ = fields_
        if(gameFinished) extraText = true;
        add_editor_text(fields_);

        // circles = newCircle(7)
        valid = true
    }
};

const regex = new RegExp("fields.+")

const add_editor_text = (fields_) => {
    let str = mainEditor.editor.getValue();
    str = str.replace(regex, "")
    mainEditor.editor.setValue(
        str + `fields = [${fields_}];`
    );
    let strout = mainEditor.editor2.getValue()
    mainEditor.editor2.setValue(
        strout + `Yeah`
    )
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
    //
    line(width/2 -70, height/2 -25, width/2 -120, height/2 +30)
    line(width/2 -120, height/2 -25, width/2 -70, height/2 +30)

    line(width/2 -70, height/2 -25, width/2 -120, height/2 +30)
    line(width/2 -120, height/2 -25, width/2 -70, height/2 +30)

    //line(width/2 +50, height/2 -50, width/2 -100, height/2 +100)

    rect(width/2 -125,height/2 +50,250,5)
    rect(width/2 -125,height/2 -50,250,5)


    noFill()
    // circle(width/2 -100 ,height/2 + 100,50)
    // circle(width/2 +100 ,height/2 + 100,50)


    if(fields__[7] && yourTurn) {
        let circles = newCircle(7)
        circle(circles[0], circles[1], circles[2])
    }
    if(fields__[0] && yourTurn) {
        let circles = newCircle(0)
        circle(circles[0], circles[1], circles[2])
    }
    if(fields__[1] && yourTurn) {
        let circles = newCircle(1)
        circle(circles[0], circles[1], circles[2])
    }
    if(fields__[2] && yourTurn) {
        let circles = newCircle(2)
        circle(circles[0], circles[1], circles[2])
    }
    if(fields__[3] && yourTurn) {
        let circles = newCircle(3)
        circle(circles[0], circles[1], circles[2])
    }
    if(fields__[4] && yourTurn) {
        let circles = newCircle(4)
        circle(circles[0], circles[1], circles[2])
    }
    if(fields__[5] && yourTurn) {
        let circles = newCircle(5)
        circle(circles[0], circles[1], circles[2])
    }
    if(fields__[6] && yourTurn) {
        let circles = newCircle(6)
        circle(circles[0], circles[1], circles[2])
    }
    if(fields__[8] && yourTurn) {
        let circles = newCircle(8)
        circle(circles[0], circles[1], circles[2])
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
        let circle0 = [width/2 -100,height/2 - 100,50]
        checkPosition[0] = true
        return circle0
    }
    if(position === 1){
        let circle1 = [width/2,height/2 + 100,50]
        checkPosition[1] = true
        return circle1

    }
    if(position === 2){
        let circle2 = [width/2 +100 ,height/2 -100,50]
        checkPosition[2] = true
        return circle2

    }
    if(position === 3){
        let circle3 = [width/2 -100 ,height/2,50]
        checkPosition[3] = true
        return circle3

    }
    if(position === 4){
        let circle = [width/2 ,height/2 - 100,50]
        checkPosition[4] = true
        return circle4

    }
    if(position === 5){
        let circle5 = [width/2 +100 ,height/2 - 100,50]
        checkPosition[5] = true
        return circle5

    }
    if(position === 6){
        let circle6 = [width/2 -100 ,height/2 + 100,50]
        checkPosition[6] = true
        return circle6

    }
    if(position === 7){
        let circle7 = [width/2,height/2 + 100,50]
        checkPosition[7] = true
        return circle7

    }
    if(position === 8){
        let circle8 = [width/2 +100 ,height/2 + 100,50]
        checkPosition[8] = true
        return circle8

    }

}

function checkPostionCircle(){
    var checkPosition = [false, false, false ,false ,false ,false ,true, false ,true]

    return checkPosition
}





function windowResized() {
    resizeCanvas(helpers.realWidth(90), helpers.view_2_px(50));
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;