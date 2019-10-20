let mic, fft;
// noise.seed(Math.random());
const inc = 0.01;
let time = 0;
var record = false;


function setup() {
  createCanvas(257, 400);
  noFill();

  myFun()
}
async function myFun() {

  for (let frame=0; frame < data.length/32 ; frame++){
    // enable = true;
    let spectrum = data[frame];
    console.log(spectrum.length);
    
    await sleep(1000);

    background(0);
    colorMode(HSB, 255, 255, 255);
  
    // let spectrum = fft.analyze();

    let yoff = 1;
    loadPixels();
    //for (let x = 0; x < width; x++) {
    for (let x = 0; x < width; x++) {
      if (record){console.log(x)}
      
      let xoff = 1;
      let bar_height = map(spectrum[x], -150, 360, height, 0);
      let col = color(map(x, 0, spectrum.length, 0, 235), 255, 255);
      let r = red(col);
      let g = green(col);
      let b = blue(col)

      for (let y = 0; y < bar_height; y++){
        let inverted_y = height - y;
        let index = (x + inverted_y * width) * 4;
        // noiseDetail(8, 0.65)
        let n = noise(xoff, yoff, time);
        // n = 0.9;
        pixels[index + 0] = r * (n+0.5);
        pixels[index + 1] = g * (n+0.5);
        pixels[index + 2] = b * (n+0.5);
        xoff += inc;
      }
      yoff += inc;
    } 
    time += 0.1;

    updatePixels();
    }
    // enable = false;
    myFun()
  
}

function stop() {
  record = ! record;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}