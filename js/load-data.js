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

    //console.log(Math.round(100 * (receivedLength / contentLength)) + "% fertig ...");
    updateModal(Math.round(100 * (receivedLength / contentLength)));
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

function updateModal(percentage){
  document.getElemetById("progbar").style.width=percentage+"%";
}
