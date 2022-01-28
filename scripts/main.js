var canvas;
var ctx;

var width;
var height;

const blockSize = 40;

const ticksPerSec = 3;

var fileSystem;
var imageCache;

var hero;

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

class Character {
    constructor(name) {
        this.name = name;
        this.tick = 0;
        this.x = 200;
        this.y = 200;
    }

    update() {
        this.x += 1;
        this.tick += 1;
        this.tick = this.tick % 1000;
    }

    draw() {
        if (this.images == undefined) {
            this.images = imageCache;
        }
        var imageName = "characters/" + this.name + "/" + this.name + String((Math.floor(this.tick / 90)) % 3);
        let image = this.images[imageName];
        console.log(imageName);
        ctx.drawImage(image, this.x, this.y);
    }
}

function main() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    hero = new Character("hero");
    load();
}

function draw() {
    for (var x = 0; x < width / blockSize; x++) {
        for (var y = 0; y < height / blockSize; y++) {
            ctx.fillStyle = "black";
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            ctx.fillStyle = "white";
            ctx.fillRect(x * blockSize + blockSize / 30, y * blockSize + blockSize / 30, blockSize * 14 / 15, blockSize * 14 / 15)
        }
    }
    hero.draw();
}

function gameLoop(time) {
    hero.update();
    draw();
    requestAnimationFrame(gameLoop);
}