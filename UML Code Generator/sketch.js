let arr = [];
let i, j, k;
let fontsize;
let mode = "default";
let currentSelectedClass, oldSelectedClass, sizeOfClass;
let ulr, file, link;

function setup() {
  createCanvas(
    windowWidth < windowHeight ? windowWidth : windowHeight,
    windowWidth < windowHeight ? windowWidth : windowHeight
  );
  fontsize = width / 30;
  sizeOfClass = width / 5;
  textSize(fontsize);
  textAlign(CENTER, CENTER);
}

function draw() {
  drawBackground();
  arr.forEach(drawBind);
  arr.forEach(drawClass);
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
    case "attributes":
      background("gray");
      break;
    case "methods":
      background("gray");
      break;
    default:
      background("cyan");
      break;
  }
}

function drawClass(classObj) {
  classObj.drag ? fill("red") : fill("white");
  square(
    classObj.v.x - sizeOfClass / 2,
    classObj.v.y - sizeOfClass / 2,
    sizeOfClass
  );
  fill("black");
  text(classObj.name, classObj.v.x, classObj.v.y - 2 * fontsize);
  if (classObj.attributes.length != 0) {
    line(
      classObj.v.x - sizeOfClass / 2,
      classObj.v.y - fontsize,
      classObj.v.x + sizeOfClass / 2,
      classObj.v.y - fontsize
    );
    line(
      classObj.v.x - sizeOfClass / 2,
      classObj.v.y + (classObj.attributes.length - 1) * fontsize,
      classObj.v.x + sizeOfClass / 2,
      classObj.v.y + (classObj.attributes.length - 1) * fontsize
    );
  }
  for (i = 0; i < classObj.attributes.length; i++) {
    text(
      (classObj.attributes[i].visibility == "public"
        ? "+"
        : classObj.attributes[i].visibility == "private"
          ? "-"
          : "#") +
      " " +
      classObj.attributes[i].name,
      classObj.v.x,
      classObj.v.y + i * fontsize - fontsize / 2
    );
  }
  for (
    i = classObj.attributes.length;
    i < classObj.methods.length + classObj.attributes.length;
    i++
  ) {
    text(
      (classObj.methods[i - classObj.attributes.length].visibility == "public"
        ? "+"
        : classObj.methods[i - classObj.attributes.length].visibility == "private"
          ? "-"
          : "#") +
      " " +
      classObj.methods[i - classObj.attributes.length].name,
      classObj.v.x,
      classObj.v.y + i * fontsize - fontsize / 2
    );
  }
}

function drawBind(classObj) {
  if (!classObj.inherits) {
    return;
  }
  fill("black");
  line(
    classObj.v.x,
    classObj.v.y,
    classObj.inheritsFrom.v.x,
    classObj.inheritsFrom.v.y
  );
}

function printClass(classObj) {
  let myStr = "";
  myStr += classObj.visibility;
  myStr += " class " + classObj.name;
  if (classObj.inherits) {
    myStr += " : " + classObj.inheritsFrom.name;
  }
  if (classObj.implements) {
    myStr += " implements ";
    for (i = 0; i < classObj.implementsFrom.length; i++) {
      myStr += classObj.implementsFrom[i].name;
      if (i != classObj.implementsFrom.length - 1) {
        myStr += ", ";
      }
    }
  }
  myStr += " {\n";
  for (i = 0; i < classObj.attributes.length; i++) {
    myStr += printAttribute(classObj.attributes[i]);
  }
  for (i = 0; i < classObj.methods.length; i++) {
    myStr += printMethod(classObj.methods[i]);
  }
  myStr += "}";
  return myStr;
}

function printClasses() {
  let myStr = "";
  for (k = 0; k < arr.length; k++) {
    myStr += printClass(arr[k]) + "\n\n";
  }
  return myStr;
}

function printAttribute(attributeObj) {
  return (
    "\t" +
    attributeObj.visibility +
    " " +
    attributeObj.type +
    " " +
    attributeObj.name +
    (attributeObj.value == null ||
      attributeObj.value == undefined
      ? ""
      : " "+attributeObj.value) +
    ";\n\t");
}

function printMethod(methodObj) {
  return (
    "\t" +
    methodObj.visibility +
    " " +
    methodObj.returnType +
    " " +
    methodObj.name +
    "(" +
    (methodObj.args.length != 0 ? methodObj.args : "") +
    "){\n\n\t}\n");
}

/*let str = "";
for (i = 0; i < arr.length; i++) {
str += "public class " + arr[i].name;
str += arr[i].inherits
  ? " : " + arr[i].inheritsFrom.name + " {\n\t"
  : " {\n";
for (j = 0; j < arr[i].attributes.length; j++) {
  str +=
    "\t" +
    arr[i].attributes[j].visibility +
    " " +
    arr[i].attributes[j].type +
    " " +
    arr[i].attributes[j].name +
    (arr[i].attributes[j].value == null ||
    arr[i].attributes[j].value == undefined
      ? ""
      : arr[i].attributes[j].value) +
    ";\n\t";
}
str += "public " + arr[i].name + "() {\n\n\t}\n";
for (j = 0; j < arr[i].methods.length; j++) {
  str +=
    "\t" +
    arr[i].methods[j].visibility +
    " " +
    arr[i].methods[j].returnType +
    " " +
    arr[i].methods[j].name +
    "(" +
    (arr[i].methods[j].args.length != 0 ? arr[i].methods[j].args : "") +
    "){\n\n\t}\n";
}
str += "}\n\n";
}
return str;
}
*/

