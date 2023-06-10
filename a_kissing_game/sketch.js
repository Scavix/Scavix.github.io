let i,
  meImg,
  sheImg,
  kissSound,
  trackSound,
  screamSound,
  backgroundKissImg,
  backgroundImg,
  faceSizes,
  kissImg,
  eyeLeftImg,
  eyeRightImg,
  eyeImg,
  kissing = false,
  looking = "center",
  eyeSizes,
  counter = 0,
  kissScore = 0,
  playedScream = false,
  started = false,
  button,
  startingDelay = 0,
  pressed = false;

function preload() {
  backgroundImg = loadImage("assets/background1.png");
  backgroundKissImg = loadImage("assets/background2.png");
  meImg = loadImage("assets/me.png");
  sheImg = loadImage("assets/she.png");
  kissImg = loadImage("assets/kiss.png");
  eyeLeftImg = loadImage("assets/eye_left.png");
  eyeRightImg = loadImage("assets/eye_right.png");
  eyeImg = loadImage("assets/eye.png");
  kissSound = loadSound("assets/kiss.mp3");
  trackSound = loadSound("assets/soundtrack.mp3");
  screamSound = loadSound("assets/scream.mp3");
}

function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  faceSizes = min(windowWidth, windowHeight) / 7;
  eyeSizes = min(windowWidth, windowHeight) / 16;
  button = createButton("Start");
  button.class("button-30");
  button.position(windowWidth /  2 - button.width, windowHeight / 4);
  button.mousePressed(() => {
    pressed = true;
    button.hide();
  });
}

function draw() {
  if (!kissing) {
    image(backgroundImg, 0, 0, width, height);
    image(meImg, (width / 100) * 72, (height / 100) * 36, faceSizes, faceSizes);
    image(
      sheImg,
      (width / 100) * 56.5,
      (height / 100) * 40.5,
      faceSizes,
      faceSizes
    );
  } else {
    image(backgroundKissImg, 0, 0, width, height);
    image(
      sheImg,
      (width / 100) * 59,
      (height / 100) * 38,
      faceSizes,
      faceSizes
    );
    image(meImg, (width / 100) * 70, (height / 100) * 37, faceSizes, faceSizes);
    image(
      kissImg,
      (width / 100) * 67,
      (height / 100) * 45,
      faceSizes / 2,
      faceSizes / 2
    );
  }
  if (looking == "left") {
    image(
      eyeLeftImg,
      (width / 100) * 17,
      (height / 100) * 41,
      eyeSizes,
      eyeSizes
    );
    image(
      eyeLeftImg,
      (width / 100) * 21,
      (height / 100) * 41,
      eyeSizes,
      eyeSizes
    );
  } else if (looking == "right") {
    image(
      eyeRightImg,
      (width / 100) * 21,
      (height / 100) * 41,
      eyeSizes,
      eyeSizes
    );
    image(
      eyeRightImg,
      (width / 100) * 17,
      (height / 100) * 41,
      eyeSizes,
      eyeSizes
    );
  } else {
    image(eyeImg, (width / 100) * 21, (height / 100) * 41, eyeSizes, eyeSizes);
    image(eyeImg, (width / 100) * 17, (height / 100) * 41, eyeSizes, eyeSizes);
  }
  if (started) {
    counter++;
    if (counter == 60 * 2) {
      counter = 0;
      if (looking == "right") {
        looking = "center";
      } else if (looking == "center") {
        looking = random(["left", "right", "center"]);
      } else if (looking == "left") {
        looking = "center";
      }
    }
    if (kissing) {
      kissScore++;
    }
    textSize(min(windowWidth, windowHeight) / 20);
    text(
      kissScore,
      (min(windowWidth, windowHeight) / 100) * 2,
      min(windowWidth, windowHeight) / 100 + min(windowWidth, windowHeight) / 20
    );
    if (kissing && looking == "right") {
      trackSound.stop();
      if (playedScream == false) {
        screamSound.play();
        playedScream = true;
      }
    } else {
      playedScream = false;
    }
  }else{
    
    if(pressed){
      startingDelay++;
      if(startingDelay==20){
        started = true;
        trackSound.play();
      }
    }
  }
}
function mousePressed() {
  if (started) {
    kissing = true;
    trackSound.stop();
    kissSound.loop();
  }
}
function touchStarted() {
  mousePressed();
}
function mouseReleased() {
  if (started) {
    kissing = false;
    trackSound.play();
    kissSound.stop();
  }
}
function touchEnded() {
  mouseReleased();
}
