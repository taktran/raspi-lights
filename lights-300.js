var five = require("johnny-five");
var pixel = require("node-pixel");
var raspi = require("raspi-io");
var opts = {};
opts.port = process.argv[2] || "";
opts.io = new raspi();

var board = new five.Board(opts);
var strip = null;

var fps = 20; // how many frames per second do you want to try?

board.on("ready", function() {

  console.log("Board ready, lets add light");

  strip = new pixel.Strip({
    color_order: pixel.COLOR_ORDER.GRB,
    board: this,
    controller: "I2CBACKPACK",
    strips: [300]
  });

  strip.on("ready", function() {
    console.log("Strip ready, let's go");

    strip.color("#000");

    // Last pixel working
    var index = 255;
    var p = strip.pixel(index);
    p.color("blue");

    // 1st pixel not working
    var index2 = 256;
    var p2 = strip.pixel(index2);
    p2.color("red");

    console.log(`color at ${index}`, p.color());
    console.log(`color at ${index2}`, p2.color());
    strip.show();
  });
});
