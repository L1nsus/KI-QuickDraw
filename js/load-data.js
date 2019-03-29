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

  console.log(Math.round(contentLength / receivedLength) + "% fertig ...");
}

let chunksAll = new Uint8Array(receivedLength);
let position = 0;
for(let chunk of chunks) {
  chunksAll.set(chunk, position);
  position += chunk.length;
}
console.log(chunksAll);
return chunksAll;
}
