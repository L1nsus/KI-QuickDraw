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

async function loadDataFromFile(URL){

let response = await fetch(URL);

const reader = response.body.getReader();
const contentLength = +response.headers.get('Content-Length');

let receivedLength = 0;
let chunks = [];
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(Math.round(receivedLength / contentLength) + "% fertig ...");
}

// Step 4: concatenate chunks into single Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
  chunksAll.set(chunk, position); // (4.2)
  position += chunk.length;
}
return chunksAll;
}
