let arr = [];
let i, j, k;
let fontsize;
let mode = "default";
let currentSelectedPage, oldSelectedPage, sizeOfPage;
let ulr, file, link;

function setup() {
  createCanvas(
    windowWidth < windowHeight ? windowWidth : windowHeight,
    windowWidth < windowHeight ? windowWidth : windowHeight
  );
  fontsize = width / 30;
  sizeOfPage = width / 5;
  textSize(fontsize);
  textAlign(CENTER, CENTER);
}

function draw() {
  drawBackground();
  arr.forEach(drawBind);
  arr.forEach(drawPages);
}

function drawBackground() {
  switch (mode) {
    case "create":
      background("yellow");
      break;
    case "drag":
      background("blue");
      break;
    case "bind":
      background("green");
      break;
    default:
      background("cyan");
      break;
  }
}

function drawBind(page) {
  fill("black");
  for (let i = 0; i < page.connections.length; i++) {
    line(page.v.x, page.v.y, page.connections[i].v.x, page.connections[i].v.y);
  }
}

function drawPages(page) {
  page.drag ? fill("red") : fill("white");
  square(page.v.x - sizeOfPage / 2, page.v.y - sizeOfPage / 2, sizeOfPage);
  fill("black");
  text(page.name, page.v.x, page.v.y - 2 * fontsize);
  if (page.connections.length != 0) {
    line(
      page.v.x - sizeOfPage / 2,
      page.v.y - fontsize,
      page.v.x + sizeOfPage / 2,
      page.v.y - fontsize
    );
    line(
      page.v.x - sizeOfPage / 2,
      page.v.y + (page.connections.length - 1) * fontsize,
      page.v.x + sizeOfPage / 2,
      page.v.y + (page.connections.length - 1) * fontsize
    );
  }
  for (i = 0; i < page.connections.length; i++) {
    text(
      page.connections[i].name,
      page.v.x,
      page.v.y + i * fontsize - fontsize / 2
    );
  }
}

function printPage(page) {
  let myStr = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\" />\n<title>";
  myStr += page.name;
  myStr += "</title>\n</head>\n<body>\n<header>\n<h1>Hello, world!</h1>\n</header>\n<main>\n";
  for (i = 0; i < page.connections.length; i++) {
    myStr += printLinks(page.connections[i]);
  }
  myStr += "</main>\n<footer></footer>\n</body>\n</html>\n";
  return myStr;
}

function showPages() {
  let myStr = "";
  for (k = 0; k < arr.length; k++) {
    myStr += printPage(arr[k]) + "\n\n";
  }
  return myStr;
}

function printLinks(link) {
  return "\t<section><a href = \"" + generateUrl(link.name) + "\">"+link.name+"</a></section>\n";
}

function generateUrl(name) {
    return "./" + name + ".html";
}