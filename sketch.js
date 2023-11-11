let fft;
let img
let window_stroke;
let particles = []
let dragDiv;
let canvas;

function preload() {
  mySound = loadSound('./sounds/core_dump.wav');
 }

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES)
  rectMode(CENTER)
  fft = new p5.FFT(0.3);
}

function draw() {
  background(0);

  translate(width / 2, height / 2)

  fft.analyze()
  amp = fft.getEnergy(20,200)

  var alpha = map(amp, 0, 128, 180, 150)
  fill(0, alpha)
  noStroke()
  rect(0,0,width, height)

  stroke(255)
  strokeWeight(.5)
  noFill()

  let wave = fft.waveform();

  for (var t = -1; t <= 1; t += 2) {
    beginShape()
    for(let i = 0; i < 180; i += 0.5) {
      let index = floor(map(i,0,180,0,wave.length - 1))
  
      let r = map(wave[index], -1, 1, 25, 175)
  
      let x = r * sin(i) * t
      let y = r * cos(i)
      vertex(x,y)
    }
    endShape()
  }

  let p = new Particle()
  particles.push(p)

  for(let i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update(amp > 230)
      particles[i].show()
    } else {
      particles.splice(i, 1)
    }
  }
}

function mouseClicked() {
  if (mySound.isPlaying()) {
    mySound.pause()
    noLoop()
  } else {
    mySound.play()
    loop()
  }
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(100)
    this.vel = createVector(0,0)
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

    this.w = random(.5, 2)

    this.color = [random(200, 255),random(200, 255),random(200,255),]
  }

  update(cond) {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if(cond) {
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }

  edges() {
    if (this.pos.x < -width / 2 || this.pos.x > width / 2 || this.pos.y < -height / 2 || this.pos.y > height / 2) {
      return true
    } else {
      return false
    }
  }

  show() {
    noStroke()
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.w)
  }
}