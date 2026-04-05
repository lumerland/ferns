let asciiChar = "@#%&$8BMW0QRDOHNKAXZUVYCLJTFIEPS?/|()1{}[]il!tfrj*+=~-_:;,.'";
let video;
let vidw = 64;
let vidh = 48;
let scl = 10;
let w, h;
 
function preload() {
  video = createVideo("longgrass.mp4", function() {
    video.hide();
  });
}
 
function setup() {
  createCanvas(vidw * scl, vidh * scl);
  video.size(vidw, vidh);
  video.elt.muted = true;
  video.loop();
  video.play();
  w = width / vidw;
  h = height / vidh;
}
 
function draw() {
  background(0);

  if (video.width == 0) return;

  video.loadPixels();
 
  for (let i = 0; i < vidw; i++) {
    for (let j = 0; j < vidh; j++) {
      let pixelIndex = (i + j * vidw) * 4;
      let r = video.pixels[pixelIndex + 0];
      let g = video.pixels[pixelIndex + 1];
      let b = video.pixels[pixelIndex + 2];
 
      let bright = (r + g + b) / 3;
      let tIndex = floor(map(bright, 0, 255, 0, asciiChar.length));
 
      let x = i * w + w / 2;
      let y = j * h + h / 2;
      let t = asciiChar.charAt(tIndex);
 
      textSize(w);
      textAlign(CENTER, CENTER);
      fill(r, g, b);
      text(t, x, y);
    }
  }
}