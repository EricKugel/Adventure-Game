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

class Character {
    constructor(name) {
        this.name = name;
        this.tick = 0;
        this.x = 200;
        this.y = 200;
        this.state = "Idle";
        this.direction = "forward";
    }

    update() {
        this.state = "Walk"
        if (keysDown["ArrowRight"]) {
            this.direction = "right";
            this.x += 5;
        } else if (keysDown["ArrowLeft"]) {
            this.direction = "left";
            this.x -= 5;
        } else if (keysDown["ArrowUp"]) {
            this.direction = "backward";
            this.y -= 5;
        } else if (keysDown["ArrowDown"]) {
            this.direction = "forward";
            this.y += 5;
        } else {
            this.state = "Idle"
        }
        this.tick += 1;
    }

    draw() {
        if (this.images == undefined) {
            this.images = imageCache;
        }
        var imageName = "characters/" + this.name + "/" + this.direction + this.state + (this.tick % 8);
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
    setTimeout(gameLoop, 1000 / 20)
}