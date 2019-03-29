async function loadDataFromFile(URL){

  let response = await fetch(URL);
  
  document.getElementById("progbar-wrapper").style.display="block";

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
    
    updateModal(100 * (receivedLength / contentLength), URL);
  }

  let chunksAll = new Uint8Array(receivedLength);
  let position = 0;
  for(let chunk of chunks) {
    chunksAll.set(chunk, position);
    position += chunk.length;
  }
  document.getElementById("progbar-wrapper").style.display="none";
  return await Promise.resolve(chunksAll);
}

function updateModal(percentage, URL){
  document.getElementById("progbar-text").innerHTML="Gerade wird der Datensatz <i>" + 
    URL.split("/").reverse()[0] + 
    "</i> geladen.<br><div class=\"w3-center\">" +
    Math.round(percentage) + 
    "% fertig</div>";
  document.getElementById("progbar").style.width=percentage+"%";
}
