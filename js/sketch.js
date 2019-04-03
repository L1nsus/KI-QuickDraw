let clrButton;
let appleDataArray, basketballsDataArray, lightbulbsDataArray, pizzasDataArray, swordsDataArray;

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
  document.getElementById("info-wrapper").style.display="block";
  document.getElementById("info-text").innerHTML="<i class=\"material-icons w3-display-topright w3-jumbo\">cloud_download</i>\
    <br>Es werden nun Datensets geladen: Dies kann mehrere Minuten in Anspruch nehmen.\
    <br><div class=\"w3-center\">Bitte haben sie Geduld...</div>";
  window.setTimeout( () => {
    document.getElementById("info-wrapper").style.display="none";
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
              document.getElementById("info-wrapper").style.display="block";
              document.getElementById("info-text").innerHTML="<div class=\"w3-xxxlarge\">\
                <span onclick=\"document.getElementById(\'info-wrapper\').style.display=\'none\'\"\
                  class=\"w3-button w3-display-topright\"><i class=\"material-icons w3-xlarge\">cancel</i></span>\
                Fertig <i class=\"material-icons w3-xxxlarge\">cloud_done</i></div>";
            });
          });
        });
      });
    }).catch(ERR => {
      console.err(ERR);
      document.getElementById("info-wrapper").style.display="block";
      document.getElementById("info-text").innerHTML="Folgender Fehler ist aufgetreten:<br>" +
        ERR + "<br><i class=\"material-icons w3-jumbo\">sync_problem</i>";
      throw(ERR);
      return null;
    });
  }, 5000);
}
