'use strict';

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [],
};


function changeMeme(id) {
  gMeme.selectedImgId = id;
  gMeme.lines = [];
  document.getElementById('gallery-container').classList.add('hidden');
  document.getElementById('meme-editor-page').classList.remove('hidden');
  drawCanvas();
}


function createLine(text, font = 'impact', posX, posY) {
  var newLine = {
    text,
    size: 50,
    font,
    align: 'center',
    strokeColor: 'black',
    color: 'white',
    pos: {
      x: posX,
      y: posY
    }
  };

  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function switchLine() {
  gMeme.selectedLineIdx++;
  if (gMeme.selectedLineIdx >= gMeme.lines.length) {
    gMeme.selectedLineIdx = 0;
  }

  document.getElementById('input-text').value =
    gMeme.lines[gMeme.selectedLineIdx].text;
  drawCanvas();
}

function addLine() {
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

  createLine(
    document.getElementById('input-text').value,
    document.getElementById('font-list').value,
    posX, posY
  );

  drawCanvas();

  document.getElementById('update').disabled = false;
  document.getElementById('update').style.filter = 'none';
}

function updateLine() {
  gMeme.lines[gMeme.selectedLineIdx].text = document.getElementById("input-text").value;
  drawCanvas();
}

function moveUpLine() {
  gMeme.lines[gMeme.selectedLineIdx].pos.y -= 25;
  drawCanvas();
}

function moveDownLine() {
  gMeme.lines[gMeme.selectedLineIdx].pos.y += 25;
  drawCanvas();
}

function deleteLine() {
  gMeme.lines.pop();
  gMeme.selectedLineIdx = gMeme.lines.length - 1;

  if (gMeme.lines.length === 0) {
    document.getElementById('update').disabled = true;
    document.getElementById('update').style.filter = 'grayscale(100%)';
    document.getElementById('input-text').value = '';
  }

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
  gMeme.lines[gMeme.selectedLineIdx].align = 'left';
  drawCanvas();
}

function alignCenter() {
  gMeme.lines[gMeme.selectedLineIdx].align = 'center';
  drawCanvas();
}

function alignRight() {
  gMeme.lines[gMeme.selectedLineIdx].align = 'right';
  drawCanvas();
}

function changeStroke() {
  gMeme.lines[gMeme.selectedLineIdx].strokeColor =
    gMeme.lines[gMeme.selectedLineIdx].strokeColor === 'black' ? 'white' : 'black';
  drawCanvas();
}

function changeColor() {
  gMeme.lines[gMeme.selectedLineIdx].color =
    document.getElementById('color-picker').value;
  drawCanvas();
}

function fontChange(selectObject) {
  gMeme.lines[gMeme.selectedLineIdx].font = selectObject.value;
  drawCanvas();
}

function downloadCanvas(elLink) {
  drawCanvas(elLink);
}