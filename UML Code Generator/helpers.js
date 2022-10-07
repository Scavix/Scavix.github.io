function mouseClicked() {
  if (mode == "create") {
    let val;
    while (val == null || val.trim() == "") {
      val = prompt("Insert Class Name [Empty not accepted]");
    }
    arr.push(new CClass(val, createVector(mouseX, mouseY)));
  } else if (mode == "drag") {
    for (j = 0; j < arr.length; j++) {
      if (touchRetriever(arr[j])) {
        currentSelectedClass = j;
        arr[currentSelectedClass].drag = true;
        console.log("mouseClicked");
        for (i = 0; i < arr.length; i++) {
          if (i != currentSelectedClass) {
            arr[i].drag = false;
          }
        }
      }
    }
  } else if (mode == "bind") {
    for (j = 0; j < arr.length; j++) {
      if (touchRetriever(arr[j])) {
        oldSelectedClass = currentSelectedClass;
        currentSelectedClass = j;
        if (
          oldSelectedClass != null &&
          oldSelectedClass != currentSelectedClass
        ) {
          arr[oldSelectedClass].inheritsFrom = arr[currentSelectedClass];
          console.log(oldSelectedClass);
          arr[oldSelectedClass].inherits = true;
          console.log("bindCreated");
          resetSelectedClasses();
        }
      }
    }
  } else if (mode == "attributes") {
    for (j = 0; j < arr.length; j++) {
      if (touchRetriever(arr[j])) {
        let name, type, visibility, val;
        while (name == null || name.trim()=="") {
          name = prompt("Insert Attribute Name [Empty not accepted]");
        }
        while (type == null) {
          type = prompt("Insert Attribute Type [1 int - 2 string - 3 bool - 4 float]");
        }
        while (visibility == null) {
          visibility = prompt("Insert Method Visibility [1 public - 2 private - 3 protected]");
        }
        while (val == null) {
          val = prompt("Insert Attribute Value [Empty accepted]");
        }
        arr[j].attributes.push(new AAttribute(name, type, visibility, val));
      }
    }
  } else if(mode == "methods"){
    for (j = 0; j < arr.length; j++) {
      if (touchRetriever(arr[j])) {
        let name, returnType, visibility, args;
        while (name == null || name.trim()=="") {
          name = prompt("Insert Method Name [Empty not accepted]");
        }
        while (returnType == null) {
          returnType = prompt("Insert Method Return Type [1 int - 2 string - 3 bool - 4 float]");
        }
        while (visibility == null) {
          visibility = prompt("Insert Method Visibility [1 public - 2 private - 3 protected]");
        }
        while (args == null) {
          args = prompt("Insert Method Arguments [Empty accepted]");
        }
        arr[j].methods.push(new MMethod(name, returnType, visibility, args));
      }
    }
  }
}

function touchRetriever(el) {
  return dist(mouseX, mouseY, el.v.x, el.v.y) < sizeOfClass / 2;
}

function touchMoved() {
  for (j = 0; j < arr.length; j++) {
    if (arr[currentSelectedClass] != null) {
      if (arr[currentSelectedClass].drag) {
        arr[currentSelectedClass].v.x = mouseX;
        arr[currentSelectedClass].v.y = mouseY;
      }
    }
  }
}

function keyPressed() {
  console.log(key);
  resetAll();
  switch (key) {
    case "1":
      mode = "create";
      console.log("create");
      break;
    case "2":
      mode = "drag";
      console.log("drag");
      break;
    case "3":
      mode = "bind";
      console.log("bind");
      break;
    case "4":
      mode = "attributes";
      console.log("attributes");
      break;
    case "5":
      mode = "methods";
      console.log("methods");
      break;
    case "6":
      mode = "default";
      console.log("default");
      printRules();
      break;
    case "p":
      alert(printClasses());
      break;
    default:
      mode = "default";
      console.log("default");
      break;
  }
}

function resetAll() {
  resetDrag();
  resetSelectedClasses();
}

function resetDrag() {
  for (i = 0; i < arr.length; i++) {
    arr[i].drag = false;
  }
}

function resetSelectedClasses() {
  currentSelectedClass = null;
  oldSelectedClass = null;
}

function printRules() {
  alert(
    "Rules:\nClick 1 to enter create mode\nClick 2 to enter drag mode\nClick 3 to enter inherit bind mode\nClick 4 to add attributes\nClick 5 to add methods\nClick 6 to print rules\nClick p to print the classes\nClick a random key to enter view mode."
  );
}
