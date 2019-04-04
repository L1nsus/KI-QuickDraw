async function loadDataFromFile(URL){

  let response = await fetch(URL);
  
  w3.show("#progbar-wrapper");

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
    
    updateModal(receivedLength, contentLength, URL);
  }

  let chunksAll = new Uint8Array(receivedLength);
  let position = 0;
  for(let chunk of chunks) {
    chunksAll.set(chunk, position);
    position += chunk.length;
  }
  w3.hide("#progbar-wrapper");
  return await Promise.resolve(chunksAll);
}

function updateModal(receivedLength, contentLength, URL){
  let perc = 100 * (receivedLength / contentLength);
  let len = contentLength.toString().length;
  document.getElementById("progbar-text").innerHTML="Gerade wird der Datensatz &#187;" +  URL.split("/").reverse()[0] + 
    "&#171; geladen. <i class=\"material-icons w3-display-topright\">save_alt</i><br><div class=\"w3-center\">\
    <span class=\"num monospace\">" + Math.round(perc) + "</span>% fertig (<span class=\"num monospace\">" + 
    nf(receivedLength, len) + "</span>/<span class=\"num monospace\">" + contentLength + "</span>)</div>";
  document.getElementById("progbar").style.width=perc+"%";
}
