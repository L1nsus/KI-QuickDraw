function onloaded(ev) {
  const canvasNode = document.getElementById('canvas');
  const canvas = canvasNode.getContext('2d');
  
  canvas.fillStyle = 'rgb(255, 255, 255)';
  canvas.fillRect(0, 0, 280, 280);
  
}

document.addEventListener("DOMContentLoaded", onloaded);
