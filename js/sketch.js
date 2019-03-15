let clrButton;

function setup(){
  let canvas = createCanvas(280, 280);
  canvas.parent("canvas");
  background(255);
  clrButton = document.getElementById("clrButton");
}

function draw(){
  stroke(0);
  strokeWeight(4);
  if(mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  clrButton.mousePressed(()=>{
    background(255);
  });
}
