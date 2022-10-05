let arr = [];
let i, j;
let fontsize = 16;
let mode = "default";
let currentSelectedClass, oldSelectedClass, sizeOfClass;

function setup() {
  createCanvas(500, 500);
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

function printClasses() {
  let str = "";
  for (i = 0; i < arr.length; i++) {
    str +=
      "public class " +
      arr[i].name +
      (arr[i].inherits ? " : " + arr[i].inheritsFrom.name : "");
    str += " {\n\t";
    str += "public " + arr[i].name + " ()";
    str += " {\n";
    str += "\t}\n";
    str += "}\n\n";
  }
  return str;
}

/*
class/struct Identifier<T>
{
    T varIdentifier;

    T genericMethod(T genericParameter)
    {
        // method body

        return genericParameter;
    }

    T genericProperty { get; set; }
}
*/
