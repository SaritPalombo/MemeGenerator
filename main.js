'use strict'

var gCtx;
var gElCanvas;

var gImgs = [
  { id: 1, url: "img/1.jpg" },
  { id: 2, url: "img/2.jpg" },
  { id: 3, url: "img/3.jpg" },
  { id: 4, url: "img/4.jpg" },
  { id: 5, url: "img/5.jpg" },
  { id: 6, url: "img/6.jpg" },
  { id: 7, url: "img/7.jpg" },
  { id: 8, url: "img/8.jpg" },
  { id: 9, url: "img/9.jpg" },
  { id: 10, url: "img/10.jpg" },
  { id: 11, url: "img/11.jpg" },
  { id: 12, url: "img/12.jpg" },
  { id: 13, url: "img/13.jpg" },
  { id: 14, url: "img/14.jpg" },
  { id: 15, url: "img/15.jpg" },
  { id: 16, url: "img/16.jpg" },
  { id: 17, url: "img/17.jpg" },
  { id: 18, url: "img/18.jpg" },
];

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [],
};

function init() {
  createGallery();
  showGallery();
}

function createGallery() {
  var elGallery = document.getElementById("gallery-container");
  gImgs.forEach((image) => {
    var img = `<img src="${image.url}" id="${image.id}" onclick = "changeMeme(this.id)"/>`;
    elGallery.innerHTML += img;
  });
}

function changeMeme(id) {
  gMeme.selectedImgId = id;
  gMeme.lines = [];
  document.getElementById("gallery-container").hidden = true;
  document.getElementById("meme-editor-page").hidden = false;
  drawCanvas();
}

function showGallery() {
  document.getElementById("gallery-container").hidden = false;
  document.getElementById("meme-editor-page").hidden = true;
}

function drawCanvas(downloadLink = null) {
  gElCanvas = document.getElementById("meme-editor");
  gCtx = gElCanvas.getContext("2d");

  gElCanvas.width = 800;
  gElCanvas.height = 800;

  var background = new Image();
  background.src = `${gImgs[gMeme.selectedImgId - 1].url}`;
  gCtx.drawImage(background, 0, 0, gElCanvas.width, gElCanvas.height);

  gMeme.lines.forEach((item) => {

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = item.strokeColor;
    gCtx.fillStyle = item.color;
    gCtx.font = `${item.size}px ${item.font}`;
    gCtx.textAlign = item.align;

    var posY;
    var posX = gElCanvas.width / 2;

    switch (gMeme.lines.length) {
      case 0:
        posY = gElCanvas.height - (gElCanvas.height - 50);
        break;
      case 1:
        posY = gElCanvas.height - 50;
        break;
      default:
        posY = gElCanvas.height / 2;
    }

    gCtx.fillText(item.txt, posX, posY);
    if (item.strokeColor !== 'transparent') {
      gCtx.strokeText(item.txt, posX, posY);
    }

  });

  if (downloadLink) {
    const data = gElCanvas.toDataURL();
    downloadLink.href = data;
  }
}

function createLine(text, font = 'impact') {
  var newLine = {
    text,
    size: 20,
    font,
    align: 'center',
    strokeColor: 'black',
    color: 'white'
  }

  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function switchLine() {
  gMeme.selectedLineIdx = (gMeme.selectedLineIdx++) % gMeme.lines.length;

  document.getElementById("input-text").value = gMeme.lines[gMeme.selectedLineIdx].text;
  drawCanvas();
}

function addLine() {
  createLine(
    document.getElementById("input-text").value,
    document.getElementById("font-list").value
  )

  drawCanvas();
}

function deleteLine() {
  gMeme.lines[gMeme.selectedLineIdx].txt = "";
  drawCanvas();
}

function biggerText() {
  gMeme.lines[gMeme.selectedLineIdx].size += 5;
  drawCanvas();
}

function smallerText() {
  gMeme.lines[gMeme.selectedLineIdx].size -= 5;
  drawCanvas();
}

function alignLeft() {
  gMeme.lines[gMeme.selectedLineIdx].align = "left";
  drawCanvas();
}

function alignCenter() {
  gMeme.lines[gMeme.selectedLineIdx].align = "center";
  drawCanvas();
}

function alignRight() {
  gMeme.lines[gMeme.selectedLineIdx].align = "right";
  drawCanvas();
}

function changeStroke() {
  gMeme.lines[gMeme.selectedLineIdx].stroke = !gMeme.lines[gMeme.selectedLineIdx].stroke;
  drawCanvas();
}

function changeColor() {
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = document.getElementById("color-picker").value;
  drawCanvas();
}

function fontChange(selectObject) {
  gMeme.lines[gMeme.selectedLineIdx].font = selectObject.value;
  drawCanvas();
}

function downloadCanvas(elLink) {
  drawCanvas(elLink);
}
