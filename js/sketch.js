let canvasNode, canvas;

function onloaded(ev) {
  canvasNode = document.getElementById('canvas');
  canvas = canvasNode.getContext('2d');
  clearCanvas();
}

function clearCanvas(){
  canvas.fillStyle = 'rgb(255, 255, 255)';
  canvas.fillRect(0, 0, 280, 280);
}

document.addEventListener("DOMContentLoaded", onloaded);
