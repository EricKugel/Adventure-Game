var canvas;
var ctx;

var width;
var height;

const blockSize = 40;

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
        var imageName = "characters/" + this.name + "/" + this.name + String((Math.floor(this.tick / 10)) % 3);
        let image = this.images[imageName];
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
    ctx.clearRect(0, 0, width, height);
    PRARIE.draw(ctx, imageCache);
    hero.draw();
}

function gameLoop() {
    hero.update();
    draw();
    setTimeout(gameLoop, 1000 / 20)
}