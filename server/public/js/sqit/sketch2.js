
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
    cnv.parent("canvasHolder");
    frameRate(60);
}

function draw() {
    background($(":root").css("--color-navy-800"));
}

for (let i = 0; i < radius; i++){
    fill(255, 0, 0, i);
    circle(-(width / 2) / 2, 0, radius-i);
}
