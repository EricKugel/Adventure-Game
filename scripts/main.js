var canvas;
var ctx;

var width;
var height;

const blockSize = 40;

function main() {
    width = window.innerWidth;
    height = window.innerHeight;
    
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);

    ctx = canvas.getContext("2d");

    for (var x = 0; x < width / blockSize; x++) {
        for (var y = 0; y < height / blockSize; y++) {
            ctx.fillStyle = "black";
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            ctx.fillStyle = "white";
            ctx.fillRect(x * blockSize + blockSize / 10, y * blockSize + blockSize / 10, blockSize * .8, blockSize* .8)
        }
    }
}
