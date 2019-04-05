// Metadaten
const totalData = 10000,
      pictureSize = 784,
      hiddenNodes = 128,
      strokeW = 8;

let eraseMode = false;

// Kategorien
const APPLE = 1,
      BASKETBALL = 2,
      LIGHTBULB = 3,
      PIZZA = 4,
      SWORD = 5,
      totalCategories = 5;

// Daten
let applesDataArray, basketballsDataArray, lightbulbsDataArray, pizzasDataArray, swordsDataArray;
let apples, basketballs, lightbulbs, pizzas, swords;
let nn, training;

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
    <br><div class=\"w3-center\">Bitte haben sie Geduld...</div>";
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
  for (let i = 0; i < 1000; i++) {
    let inputs = new Array();
    let data = training[i];
    for (let j = 0; j < data.length; j++) {
      inputs[j] = data[j] / 255;
    }
    let label = training[i].label;
    let targets = new Array(5).fill(0);
    targets[label] = 1;
    console.log(inputs);
    console.log(label);

    nn.train(inputs, targets);
  }
}
