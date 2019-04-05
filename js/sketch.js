const totalData = 10000;
const pictureSize = 784;
const hiddenNodes = 64;
const APPLE = 1;
const BASKETBALL = 2;
const LIGHTBULB = 3;
const PIZZA = 4;
const SWORD = 5;
const totalCategories = 5;

let clrButton;
let applesDataArray, basketballsDataArray, lightbulbsDataArray, pizzasDataArray, swordsDataArray;
let apples = {};
let basketballs = {};
let lightbulbs = {};
let pizzas = {};
let swords = {};

function setup(){
  w3.addClass("#init-toast", "show");
  // Create Canvas
  let canvas = createCanvas(560, 560);
  canvas.parent("canvas");
  
  // Leinwand wir mit weiß gefüllt
  background(255);
  
  // Setzt die Leinwand bei Klick auf den Löschen-Knopf zurück
  document.getElementById("clrButton").addEventListener("click", () => background(255));
  
  document.getElementById("login-button").addEventListener("click", 
    () => window.location.assign("https://github.com/Linde0404/KI-QuickDraw/"));
  
  // Datensets nach 3 Sekunden laden
  window.setTimeout(() => loadData(), 3000);
  
  document.getElementById("info-x-button").addEventListener("click", (...ev) => {
      w3.hide("#info-x-button");
      w3.hide("#info-wrapper");
    }
  );
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
  w3.removeClass("#init-toast", "show");
  w3.show("#info-wrapper");
  document.getElementById("info-text").innerHTML="<i class=\"material-icons w3-display-topright w3-jumbo\">cloud_download</i>\
    <br>Es werden nun Datensets geladen: Dies kann mehrere Minuten in Anspruch nehmen.\
    <br><div class=\"w3-center\">Bitte haben sie Geduld...</div>";
  window.setTimeout( () => {
    w3.hide("#info-wrapper");
    loadDataFromFile("./data/apples10000.bin").then( DATA =>{
      applesDataArray = DATA;
      prepareData(apples, applesDataArray, APPLE);
      loadDataFromFile("./data/basketballs10000.bin").then( DATA => {
        basketballsDataArray = DATA;
        prepareData(basketballs, basketballsDataArray, BASKETBALL);
        loadDataFromFile("./data/lightbulbs10000.bin").then( DATA => {
          lightbulbsDataArray = DATA;
          prepareData(lightbulbs, lightbulbsDataArray, LIGHTBULB);
          loadDataFromFile("./data/pizzas10000.bin").then( DATA => {
            pizzasDataArray = DATA;
            prepareData(pizzas, pizzasDataArray, PIZZA);
            loadDataFromFile("./data/swords10000.bin").then( DATA => {
              swordsDataArray = DATA;
              prepareData(swords, swordsDataArray, SWORD);
              w3.show("#info-wrapper");
              document.getElementById("info-text").innerHTML="<div class=\"w3-xxxlarge\">\
                </span>Fertig <i class=\"material-icons w3-xxxlarge\">cloud_done</i></div>";
              w3.show("#info-x-button");
            });
          });
        });
      });
    }).catch(ERR => {
      console.error(ERR);
      w3.show("#info-wrapper");
      document.getElementById("info-text").innerHTML="<i class=\"material-icons w3-xxlarge\">sync_problem</i> \
        Folgender Fehler ist aufgetreten:<hr><div class=\"monospace\">" + ERR + "</div>";
      throw(ERR);
      return null;
    });
  }, 5000);
}

function prepareData(category, data, label){
  category.training = [];
  category.testing = [];
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
}

Array.prototype.shuffleArray = function () {
  for(const i of this) {
    this.sort((a, b) => Math.random() > 0.5 ? 1 : -1);
  }
}

let nn = new NeuronalNetwork(pictureSize, hiddenNodes, totalCategories);

let training = [];
training = training.concat(apples.training);
training = training.concat(basketballs.training);
training = training.concat(lightbulbs.training);
training = training.concat(pizzas.training);
training = training.concat(swords.training);
training.prototype.shuffleArray();
