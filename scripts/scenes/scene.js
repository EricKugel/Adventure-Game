class Scene {
    constructor(key, scene) {
        this.key = key;
        this.scene = scene;
    }

    draw(ctx) {
        for (var lineIndex = 0; lineIndex < this.scene.length; lineIndex++) {
            var line = this.scene[lineIndex];
            for (var blockIndex = 0; blockIndex < line.length; blockIndex++) {
                var block = "" + line.charAt(blockIndex);
                var imageName = "blocks/" + this.key[block];
                var image = imageCache[imageName];
                ctx.drawImage(image, blockIndex * blockSize, lineIndex * blockSize);
            }
        }
    }
}

const PRARIE = new Scene({"g": "grass", "s": "stone"}, [
    "gggggggsssssssssggggggggggg",
    "gggggggggggsssssssggggggggg",
    "gggggggggssssssssssgggggggg",
    "ggggggsssssssssssgggggggggg",
    "gggggggggssssssssssgggggggg",
    "gggggggggggssssssssgggggggg",
    "ggggggggggssssssssssggggggg",
    "ggggggggsssssssssgggggggggg",
    "gggggggggsssssssssssggggggg",
    "ggggggggggssssssssggggggggg",
    "ggggggggggggggssssssggggggg"
]);