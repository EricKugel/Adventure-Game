var canvas;
var ctx;

var width;
var height;

const blockSize = 40;

var fileSystem;
var imageCache;

var hero;

var keysDown = {
    "ArrowLeft": false,
    "ArrowRight": false,
    "ArrowUp": false,
    "ArrowDown": false
}

function onComplete() {
    imageCache = ImageManager.cache;
    gameLoop();
}

function onProgress() {

}

function load() {
    jQuery.get('files.json', function(data) {
        ImageManager.load(data, onComplete, onProgress);
    });
}

function main() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", function (event) {
        try {
            keysDown[event.key] = true;
        } catch(error) { }
    });
    document.addEventListener("keyup", function (event) {
        try {
            keysDown[event.key] = false;
        } catch(error) { }
    });

    hero = new Character("hero");
    load();
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    PRARIE.draw(ctx, imageCache);
    hero.draw();
}

function gameLoop() {
    hero.update();
    draw();
    setTimeout(gameLoop, 1000 / 10)
}