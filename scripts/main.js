var canvas;
var ctx;

var width;
var height;

const blockSize = 40;

const ticksPerSec = 3;

var imageCache;

var hero;

function completedLoad(object) {
    object.loadComplete();
}

class Character {
    constructor(name) {
        this.name = name;
        this.tick = 0;
        this.x = 200;
        this.y = 200;
    }

    load(onComplete) {
        this.onComplete = onComplete;
        var images = [];
        for (var frame = 0; frame < 3; frame++) {
            images.push({
                name: this.name + frame,
                src: "lib/" + this.name + "/" + this.name + frame + ".png"
            });
        }
        ImageManager.load(images, completedLoad(this), function() {});
    }

    loadComplete() {
        debugger;
        this.imageCache = ImageManager.cache;
        this.onComplete();
    }

    update() {
        this.x += 1;
        this.tick += 1;
        this.tick = this.tick % 1000;
    }

    draw() {
        console.log(this.imageCache);
        var key = this.name + String((Math.floor(this.tick / 90)) % 3);
        let image = this.imageCache[key];
        ctx.drawImage(image, this.x, this.y);
    }
}

function load() {
//     var images = [];
//     for (var heroFrame = 0; heroFrame < 3; heroFrame++) {
//         images.push({
//             name: "hero" + heroFrame,
//             src: "lib/hero" + heroFrame + ".png"
//         });
//     }
//     ImageManager.load(images, function() {imageCache = ImageManager.cache; gameLoop();}, function() {})
    gameLoop();
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
    hero.load(function() {
        load();
    })
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