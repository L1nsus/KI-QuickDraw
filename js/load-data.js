function loadDataFromFile(path){
  fetch(path).then(
    DATA => DATA.text()
  ).then(
    TEXT => {
      console.log(TEXT);
    }
  ).catch(
    ERR => {
      console.error(ERR);
      throw(ERR);
    }
  );
}
