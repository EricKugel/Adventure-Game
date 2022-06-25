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
        console.log(imageName);
        let image = this.images[imageName];
        ctx.drawImage(image, this.x, this.y);
    }
}