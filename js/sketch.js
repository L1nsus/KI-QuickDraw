let clearButton;

function setup(){
  let canvas = createCanvas(280, 280);
  canvas.parent("canvas");
  background(255);
  clearButton = select("#clearButton");
}

function draw(){
  stroke(0);
  strokeWeight(4);
  if(mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  clearButton.mousePressed(()=>{
    background(255);
  });
}
