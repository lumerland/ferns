let asciiChar = "鬱龘纛龜龍驚聽顯願齒學體熱愛舞樹海電雲鳥風花山水月日木人小一";
let vidw = 64;
let vidh = 48;
let scl = 10;

function makeSketch(videoFile, containerId) {
  new p5(function(p) {
    let video;
    let w, h;

    p.preload = function() {
      video = p.createVideo(videoFile, function() {
        video.hide();
      });
    };

    p.setup = function() {
      let cnv = p.createCanvas(vidw * scl, vidh * scl);
      cnv.parent(containerId);  // attach to the right div
      video.size(vidw, vidh);
      video.elt.muted = true;
      video.elt.playsInline = true;
      video.loop();
      video.play();
      w = p.width / vidw;
      h = p.height / vidh;
    };

    p.draw = function() {
      p.background(0);
      if (video.width === 0) return;
      video.loadPixels();

      for (let i = 0; i < vidw; i++) {
        for (let j = 0; j < vidh; j++) {
          let pixelIndex = (i + j * vidw) * 4;
          let r = video.pixels[pixelIndex + 0];
          let g = video.pixels[pixelIndex + 1];
          let b = video.pixels[pixelIndex + 2];

          let bright = (r + g + b) / 3;
          let tIndex = p.floor(p.map(bright, 0, 255, 0, asciiChar.length));

          let x = i * w + w / 2;
          let y = j * h + h / 2;
          let t = asciiChar.charAt(tIndex);

          p.textSize(w);
          p.textAlign(p.CENTER, p.CENTER);
          p.fill(r, g, b);
          p.text(t, x, y);
        }
      }
    };
  });
}

function makeImageSketch(imageFile, containerId, vidw, vidh) {
  new p5(function(p) {
    let img;
    let w, h;

    p.preload = function() {
      img = p.loadImage(imageFile);
    };

    p.setup = function() {
      let cnv = p.createCanvas(vidw * scl, vidh * scl);
      cnv.parent(containerId);
      w = p.width / vidw;
      h = p.height / vidh;
    };

    p.draw = function() {
      p.background(0);
      img.loadPixels();

      for (let i = 0; i < vidw; i++) {
        for (let j = 0; j < vidh; j++) {
          // sample the image scaled to our grid size
          let sx = p.floor(p.map(i, 0, vidw, 0, img.width));
          let sy = p.floor(p.map(j, 0, vidh, 0, img.height));
          let pixelIndex = (sx + sy * img.width) * 4;

          let r = img.pixels[pixelIndex + 0];
          let g = img.pixels[pixelIndex + 1];
          let b = img.pixels[pixelIndex + 2];

          let bright = (r + g + b) / 3;
          let tIndex = p.floor(p.map(bright, 0, 255, 0, asciiChar.length));

          let x = i * w + w / 2;
          let y = j * h + h / 2;
          let t = asciiChar.charAt(tIndex);

          p.textSize(w);
          p.textAlign(p.CENTER, p.CENTER);
          p.fill(r, g, b);
          p.text(t, x, y);
        }
      }
    };
  });
}

// add or remove lines here for each video
makeSketch("mr.mp4", "sketch1", 64, 36);
// makeSketch("longgrass.mp4", "sketch1", 64, 48);
// makeSketch("blossom.mp4", "sketch2", 64, 50);
// makeSketch("trailing.mov", "sketch3", 64, 50)
// makeSketch("lighthouse.mov", "sketch3", 64, 36); // 16:9
// makeSketch("portrait.mp4", "sketch2", 36, 64);  // 9:16
// makeSketch("landscape.mp4", "sketch3", 64, 36); // 16:9
// makeImageSketch("photo.jpg", "sketch2", 64, 48);
// makeImageSketch("photo.jpg", "sketch3", 36, 64);
