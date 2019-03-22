let clrButton;

function setup(){
  // Create Canvas
  let canvas = createCanvas(280, 280);
  canvas.parent("canvas");
  
  // Leinwand wir mit weiß gefüllt
  background(255);
  
  // Setzt die Leinwand bei Klick auf den Löschen-Knopf zurück
  document.getElementById("clrButton").addEventListener("click", () => background(255));
}

function draw(){
  // Schwarzer Pinsel
  stroke(0);
  strokeWeight(4);
  if(mouseIsPressed){
    // Wenn die Maus gerückt wird, dann zeichne eine Linie
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
