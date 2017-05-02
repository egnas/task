const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const displayP = document.getElementById("framesPS");
let frames = 0;
const canvasAnimations = new Set();
const canvasAnimationInterval = new Set();
let lastTime = Date.now();
let lt = Date.now();
const body = document.getElementsByTagName("body");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Drawable{

  constructor(context, x = 0, y = 0, fillStyle = "#000", strokeStyle = "transparent", lineWidth = 0, deltas = new Map()){
    this.context = context;

    this.x = x;
    this.y = y;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;

    this.deltas = new Map();
    this.angle = 0;

    this.limits = {
      max: new Map(),
      min: new Map()
    };
  }



  draw(){

    this.context.save();



    this.context.translate(this.x, this.y);

    this.context.rotate(this.angle);

    this.context.fillStyle = this.fillStyle;
    this.context.strokeStyle = this.strokeStyle;
    this.context.lineWidth = this.lineWidth;

  }


  afterDraw(){

    this.context.restore();
  }

  applyAnimation(secondsElapsed){

    for(const [propertyName, valPerSec] of this.deltas){

      const changedA = secondsElapsed * valPerSec;

      this[propertyName] += changedA;

      if(this.limits.max.has(propertyName)){
        this[propertyName] = Math.min(this[propertyName],
        this.limits.max.get(propertyName) );

      }
      }
    }
  }



class Square extends Drawable{

  constructor(context, x = 0, y = 0, fillStyle = "#000", strokeStyle = "transparent", lineWidth = 0, deltas = new Map(), width = 0, height = 0){

    super(context, x, y, fillStyle, strokeStyle, lineWidth, deltas);

    this.width = width;
    this.height = height;
  }

    reset()
    {
        this.width = 50;
        this.height = 50;
    }

  draw(){



    super.draw();

    this.context.fillRect( this.width / -2, this.height / -2, this.width, this.height);
    this.context.strokeRect( this.width / -2, this.height / -2, this.width, this.height);

    super.afterDraw();
  }
}

class Line extends Drawable{

  constructor(context, x = 0, y = 0, fillStyle = "#000", strokeStyle = "transparent", lineWidth = 0,  deltas = new Map(), x2 = 100, y2 = 100){

    super(context, x, y, fillStyle, strokeStyle, lineWidth);


    this.x2 = x2;
    this.y2 = y2;
  }

    reset()
    {
        this.x2 = 0;
        this.y2 = 0;
    }
    resety()
    {
        this.y = -1000;
    }
    resetx()
    {
        this.x = -1000;
    }

  draw(){

    super.draw()

    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(this.x2, this.y2);
    this.context.fill();
    this.context.stroke();

    super.afterDraw();

  }
}

class Text extends Drawable{

  constructor(context, x = 0, y = 0, fillStyle = "#000", strokeStyle = "transparent", deltas = new Map(), fillText = ""){

    super(context, x, y, fillStyle, strokeStyle);

    this.fillText = fillText;
  }

  resetText()
  {
      this.x = -400;
  }

  draw(){

    super.draw();

    this.context.fillStyle = "#acd4af";
    this.context.font = "bold 70px verdana";
    this.context.fillText( this.fillText, this.x / -3, this.y / 5);
    super.afterDraw();

  }
}

const lineS1 = new Line(context, 200, -1000, "#801515", "#801515", 80, new Map(), 1000, 0);
const lineS2 = new Line(context, 600, -1000, "#550000", "#550000", 80, new Map(), 1000, 0);
const lineS3 = new Line(context, -1000, 200, "#487413", "#487413", 90, new Map(), 1000, 0);
const lineS4 = new Line(context, -1000, 600, "#4D648D", "#4D648D", 70, new Map(), 1000, 0);
const lineS5 = new Line(context, -1000, 800, "#FFEDAA", "#FFEDAA", 70, new Map(), 1000, 0);
const lineS6 = new Line(context, -1000, 100, "#90488A", "#90488A", 70, new Map(), 1000, 0);
const lineS7 = new Line(context, 800, -1000, "#F6E113", "#F6E113", 70, new Map(), 1000, 0);
const lineS8 = new Line(context, 100, -1000, "#9B8D00", "#9B8D00", 70, new Map(), 1000, 0);
const lineS9 = new Line(context, -1000, 450, "#F61313", "#F61313", 70, new Map(), 1000, 0);
const lineS10 = new Line(context, -1000, 350, "#FF4545", "#FF4545", 70, new Map(), 1000, 0);
const background = new Square(context, 500, 500, "black", "black", 2, new Map(), 10000, 10000);

lineS1.angle = (0.50 * Math.PI);
lineS2.angle = (0.50 * Math.PI);
lineS7.angle = (0.50 * Math.PI);
lineS8.angle = (0.50 * Math.PI);
lineS1.deltas.set("y", 70);
lineS2.deltas.set("y", 100);
lineS3.deltas.set("x", 80);
lineS4.deltas.set("x", 110);
lineS5.deltas.set("x", 130);
lineS6.deltas.set("x", 110);
lineS7.deltas.set("y", 120);
lineS8.deltas.set("y", 70);
lineS9.deltas.set("x", 50);
lineS10.deltas.set("x", 60);

canvasAnimations.add(background);

function animationLoop(){

    requestAnimationFrame(animationLoop);

    context.clearRect(0, 0, canvas.width, canvas.height);
	const diffSeconds = (Date.now() - lastTime) / 1000;

    frames++;

	lastTime = Date.now();

    if(diffSeconds > 0){
        for(const canvasObject of canvasAnimations){
          canvasObject.applyAnimation(diffSeconds);
          canvasObject.draw();
          resets();
        }
    }


}

canvasAnimations.add(lineS1);
canvasAnimations.add(lineS2);
canvasAnimations.add(lineS3);
canvasAnimations.add(lineS4);
canvasAnimations.add(lineS5);
canvasAnimations.add(lineS6);
canvasAnimations.add(lineS7);
canvasAnimations.add(lineS8);
canvasAnimations.add(lineS9);
canvasAnimations.add(lineS10);

function drawdel()
{
  canvasAnimations.delete(lineS1);
  canvasAnimations.delete(lineS2);
  canvasAnimations.delete(lineS3);
  canvasAnimations.delete(lineS4);
  canvasAnimations.add(lineS1);
  canvasAnimations.add(lineS2);
  canvasAnimations.add(lineS3);
  canvasAnimations.add(lineS4);
  lineS1.reset4();
  lineS2.reset4();
  lineS3.reset5();
  lineS4.reset5();
  text1.resetText();
}

function resets()
{
  if(lineS1.y >= 1000)
  {
      lineS1.resety();
  }
  if(lineS2.y >= 1000)
  {
      lineS2.resety();
  }
  if(lineS3.x >= 2100)
  {
      lineS3.resetx();
  }
  if(lineS4.x >= 2100)
  {
      lineS4.resetx();
  }
  if(lineS5.x >= 2100)
  {
      lineS5.resetx();
  }
  if(lineS6.x >= 2100)
  {
      lineS6.resetx();
  }
  if(lineS7.y >= 1000)
  {
      lineS7.resety();
  }
  if(lineS8.y >= 1000)
  {
      lineS8.resety();
  }
  if(lineS9.x >= 2100)
  {
      lineS9.resetx();
  }
  if(lineS10.x >= 2100)
  {
      lineS10.resetx();
  }
}

// setInterval(function(){
//   drawdel();
// }, 1000);

animationLoop();
