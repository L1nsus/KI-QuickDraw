// Metadaten
const totalData = 10000,
      pictureSize = 784,
      hiddenNodes = 128,
      strokeW = 8;
      epoch = 8000;

let eraseMode = false;

// Kategorien
const APPLE = 0,
      BASKETBALL = 1,
      LIGHTBULB = 2,
      PIZZA = 3,
      SWORD = 4,
      totalCategories = 5;

// Daten
let applesDataArray, basketballsDataArray, lightbulbsDataArray, pizzasDataArray, swordsDataArray;
let apples, basketballs, lightbulbs, pizzas, swords;
let nn, training, testing;

function setup(){
  w3.addClass("#init-toast", "show");
  
  // Leinwand erstellen
  let canvas = createCanvas(560, 560);
  canvas.parent("canvas");
  
  // Leinwand wir mit weiß gefüllt
  background(255);
  
  // Setzt die Leinwand bei Klick auf den Löschen-Knopf zurück
  document.getElementById("clrButton").addEventListener("click", () => background(255));
  
  document.getElementById("login-button").addEventListener("click", 
    () => window.open("//github.com/login?return_to=%2FLinde0404%2FKI-QuickDraw"));
  
  document.getElementById("trainButton").addEventListener("click", () => trainTheNetwork());
  
  document.getElementById("testButton").addEventListener("click", () => testTheNetwork());
  
  document.getElementById("draw-button").addEventListener("click", () => {eraseMode = false;});
  
  document.getElementById("erase-button").addEventListener("click", () => {eraseMode = true;});
  
  // Datensets nach 3 Sekunden laden
  window.setTimeout(() => loadData(), 3000);
  
  document.getElementById("info-x-button").addEventListener("click", (...ev) => {
      w3.hide("#info-x-button");
      w3.hide("#info-wrapper");
    }
  );
}

function draw(){
  if (eraseMode){
    // Weißer Pinsel
    stroke(255);
    strokeWeight(2 * strokeW);
  } else {
    // Schwarzer Pinsel
    stroke(0);
    strokeWeight(strokeW);
  }
  if(mouseIsPressed){
    // Wenn die Maus gerückt wird, dann zeichne eine Linie
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

async function loadData(){
  w3.removeClass("#init-toast", "show");
  w3.show("#info-wrapper");
  document.getElementById("info-text").innerHTML="<i class=\"material-icons w3-display-topright w3-jumbo\">cloud_download</i>\
    <br>Es werden nun Datensets geladen: Dies kann mehrere Minuten in Anspruch nehmen.\
    <br><div class=\"w3-center\">Bitte haben Sie Geduld...</div>";
  window.setTimeout( () => {
    w3.hide("#info-wrapper");
    loadDataFromFile("./data/apples10000.bin").then( DATA =>{
      applesDataArray = DATA;
      apples = prepareData(DATA, APPLE);
      loadDataFromFile("./data/basketballs10000.bin").then( DATA => {
        basketballsDataArray = DATA;
        basketballs = prepareData(DATA, BASKETBALL);
        loadDataFromFile("./data/lightbulbs10000.bin").then( DATA => {
          lightbulbsDataArray = DATA;
          lightbulbs = prepareData(DATA, LIGHTBULB);
          loadDataFromFile("./data/pizzas10000.bin").then( DATA => {
            pizzasDataArray = DATA;
            pizzas = prepareData(DATA, PIZZA);
            loadDataFromFile("./data/swords10000.bin").then( DATA => {
              swordsDataArray = DATA;
              swords = prepareData(DATA, SWORD);
              w3.show("#info-wrapper");
              document.getElementById("info-text").innerHTML="<div class=\"w3-xxxlarge\">\
                </span>Fertig <i class=\"material-icons w3-xxxlarge\">cloud_done</i></div>";
              w3.show("#info-x-button");
              
              nn = new NeuralNetwork(pictureSize, hiddenNodes, totalCategories);
              
              training = new Array()
                .concat(apples.training)
                .concat(basketballs.training)
                .concat(lightbulbs.training)
                .concat(pizzas.training)
                .concat(swords.training);
            });
          });
        });
      });
    })
    .catch(ERR => {
      console.error(ERR);
      w3.show("#info-wrapper");
      document.getElementById("info-text").innerHTML="<i class=\"material-icons w3-xxlarge\">sync_problem</i> \
        Folgender Fehler ist aufgetreten:<hr><div class=\"monospace\">" + ERR + "</div>";
      throw(ERR);
    });
  }, 5000);
}

function prepareData(data, label){
  let category = new Object();
  category.training = new Array();
  category.testing = new Array();
  for (let i = 0; i < totalData; i++){
    let offset = i * pictureSize;
    let treshold = Math.floor(0.8 * totalData);
    if (i < treshold){
      category.training[i] = data.slice(offset, offset + pictureSize);
      category.training[i].label = label;
    } else {
      category.testing[i - treshold] = data.slice(offset, offset + pictureSize);
      category.testing[i - treshold].label = label;
    }
  }
  return category;
}

function trainTheNetwork(){
  shuffle(training, true);
  for (let i = 0; i < epoch; i++) {
    let data = training[i];
    let inputs = new Array();
    for (let j = 0; j < pictureSize; i++){
      inputs[i] = data[i] / 255.0;
    }
    let label = training[i].label;
    let targets = new Array(totalCategories).fill(0);
    targets[label] = 1;
    console.log(inputs);
    console.log(label);
    console.log(targets);
    console.log(i);
    nn.train(inputs, targets);
  }
}

function testTheNetwork(){
  testing = new Array()
    .concat(apples.testing)
    .concat(basketballs.testing)
    .concat(lightbulbs.testing)
    .concat(pizzas.testing)
    .concat(swords.testing);
  let correct = 0;
  for (let i = 0; i < 10; i++) {
    let data = testing[i];
    let inputs = data.map(x => x / 255);
    let label = testing[i].label;
    let guess = nn.predict(inputs);
        
    let m = max(guess);
    let classification = guess.indexOf(m);
    
    console.log(guess);
    console.log(classification);
    console.log(label);
    
    if (classification === label) {
      correct++;
    }
  }
  let percent = correct / testing.lenght;
  console.log(percent);
}

Array.prototype.shuffle() = function() {
  let m = this.length, tmp, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    tmp = this[m];
    this[m] = this[i];
    this[i] = tmp;
  }
  return this;
}
