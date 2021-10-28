
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

function setup() {
    ellipseMode(CENTER)
    let cnv = createCanvas($(window).width(), 400);
    //let cnvInner = createCanvas($(window).width(), 400);
    cnv.parent("canvasHolder");
   // $("#defaultCanvas0").append(cnvInner)
    frameRate(60);
}

function draw() {
    background($(":root").css("--color-navy-800"));
    fill(255)

    rect(width/2 -50,75,5,250)
    rect(width/2 +50,75,5,250)
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


}


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
        circle(width/2 -100,height/2 - 100,50)
        checkPosition[0] = true
    }
    if(position === 1){
        circle(width/2,height/2 + 100,50)
        checkPosition[1] = true

    }
    if(position === 2){
        circle(width/2 +100 ,height/2 -100,50)
        checkPosition[2] = true
    }
    if(position === 3){
        circle(width/2 -100 ,height/2,50)
        checkPosition[3] = true

    }
    if(position === 4){
        circle(width/2 ,height/2 - 100,50)
        checkPosition[4] = true

    }
    if(position === 5){
        circle(width/2 +100 ,height/2 - 100,50)
        checkPosition[5] = true

    }
    if(position === 6){
        circle(width/2 -100 ,height/2 + 100,50)
        checkPosition[6] = true

    }
    if(position === 7){
        circle(width/2,height/2 - 100,50)
        checkPosition[7] = true

    }
    if(position === 8){
        circle(width/2 +100 ,height/2 + 100,50)
        checkPosition[8] = true

    }
    else{
        console.log("Enter valid field-number")
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