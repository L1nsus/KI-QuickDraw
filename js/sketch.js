function setup(){
  let canvas = createCanvas(280, 280);
  canvas.parent("canvas");
  background(255);//"white");
}

function draw(){
  stroke(0);
  strokeWeight(4);
  if(mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
