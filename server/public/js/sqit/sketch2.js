
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
    circle(width/2,height/2 + 100,50)
    circle(width/2,height/2 - 100,50)
    circle(width/2 -100 ,height/2 + 100,50)
}
