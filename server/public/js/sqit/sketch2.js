
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
    let cnv = createCanvas($(window).width(), 400);
    //let cnvInner = createCanvas($(window).width(), 400);
    cnv.parent("canvasHolder");
   // $("#defaultCanvas0").append(cnvInner)
    frameRate(60);
}

function draw() {
    background($(":root").css("--color-navy-800"));

    rect(426,0,5,800)
    rect(852,0,5,800)
    rect(0,133,1280,5)
    rect(0,266,1280,5)
}
