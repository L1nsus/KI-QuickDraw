let clrButton;
let appleDataArray, basketballsDataArray;//, lightbulbsDataArray, pizzasDataArray, swordsDataArray;

function setup(){
  // Create Canvas
  let canvas = createCanvas(560, 560);
  canvas.parent("canvas");
  
  // Leinwand wir mit weiß gefüllt
  background(255);
  
  // Setzt die Leinwand bei Klick auf den Löschen-Knopf zurück
  document.getElementById("clrButton").addEventListener("click", () => background(255));
  
  // Datensets nach 3 Sekunden laden
  window.setTimeout(() => loadData(), 3000);
}

function draw(){
  // Schwarzer Pinsel
  stroke(0);
  strokeWeight(8);
  if(mouseIsPressed){
    // Wenn die Maus gerückt wird, dann zeichne eine Linie
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function loadData(){
  loadDataFromFile("./data/apples10000.bin").then( DATA =>{
    appleDataArray = DATA;
    loadDataFromFile("./data/basketballs10000.bin").then( DATA => {
      basketballsDataArray = DATA;
      loadDataFromFile("./data/lightbulbs10000.bin").then( DATA => {
        lightbulbsDataArray = DATA;
        loadDataFromFile("./data/pizzas10000.bin").then( DATA => {
          pizzasDataArray = DATA;
          loadDataFromFile("./data/swords10000.bin").then( DATA => {
            swordsDataArray = DATA;
          });
        });
      });
    });
  }).catch(ERR => {
    console.err(ERR);
    console.log(this);
    arguments.callee();
    return;
  });
}
