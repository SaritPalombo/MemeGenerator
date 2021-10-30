'use strict';

var gCtx;
var gElCanvas;

function onInit() {
  createGallery();
  showGallery();
}

function drawCanvas(downloadLink = null) {
  gElCanvas = document.getElementById('meme-editor');
  gCtx = gElCanvas.getContext('2d');

  gElCanvas.width = 600;
  gElCanvas.height = 600;

  var background = new Image();
  background.src = `${gImgs[gMeme.selectedImgId - 1].url}`;
  gCtx.drawImage(background, 0, 0, gElCanvas.width, gElCanvas.height);

  drawText();

  if (downloadLink) {
    const data = gElCanvas.toDataURL();
    downloadLink.href = data;
  }
}

function drawText() {
  gMeme.lines.forEach((item, index) => {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = item.strokeColor;
    gCtx.fillStyle = item.color;
    gCtx.font = `${item.size}px ${item.font}`;
    gCtx.textAlign = item.align;

    gCtx.fillText(item.text, item.pos.x, item.pos.y);
    if (item.strokeColor !== 'white') {
      gCtx.strokeText(item.text, item.pos.x, item.pos.y);
    }
  });
}