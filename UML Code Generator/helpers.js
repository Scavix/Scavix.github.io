function mouseClicked() {
  if (mode == "create") {
    let val = null, visibility = null;
    while (val == null || val.trim() == "") {
      val = prompt("Insert Class Name [Empty not accepted]");
    }
    while (visibility == null) {
      visibility = prompt("Insert Class Visibility [1 public - 2 private - 3 protected]");
      switch (visibility) {
        case "1":
          visibility = "public";
          break;
        case "2":
          visibility = "private";
          break;
        case "3":
          visibility = "protected";
          break;
        default:
          visibility = null;
          break;
      }
    }
    arr.push(new CClass(val, createVector(mouseX, mouseY), visibility));
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
        let name = null, type = null, visibility = null, val = null;
        while (name == null || name.trim() == "") {
          name = prompt("Insert Attribute Name [Empty not accepted]");
        }
        while (type == null) {
          type = prompt("Insert Attribute Type [1 int - 2 string - 3 bool - 4 float]");
          switch (type) {
            case "1":
              type = "int";
              break;
            case "2":
              type = "string";
              break;
            case "3":
              type = "bool";
              break;
            case "4":
              type = "float";
              break;
            default:
              type = null;
              break;
          }
        }
        while (visibility == null) {
          visibility = prompt("Insert Attribute Visibility [1 public - 2 private - 3 protected]");
          switch (visibility) {
            case "1":
              visibility = "public";
              break;
            case "2":
              visibility = "private";
              break;
            case "3":
              visibility = "protected";
              break;
            default:
              visibility = null;
              break;
          }
        }
        val = prompt("Insert Attribute Value [Empty accepted]");
        val = val == null ? "" : val;
        arr[j].attributes.push(new AAttribute(name, type, visibility, val));
      }
    }
  } else if (mode == "methods") {
    for (j = 0; j < arr.length; j++) {
      if (touchRetriever(arr[j])) {
        let name = null, returnType = null, visibility = null, args = null;
        while (name == null || name.trim() == "") {
          name = prompt("Insert Method Name [Empty not accepted]");
        }
        while (returnType == null) {
          returnType = prompt("Insert Method Return Type [1 int - 2 string - 3 bool - 4 float]");
          switch (returnType) {
            case "1":
              returnType = "int";
              break;
            case "2":
              returnType = "string";
              break;
            case "3":
              returnType = "bool";
              break;
            case "4":
              returnType = "float";
              break;
            default:
              returnType = null;
              break;
          }
        }
        while (visibility == null) {
          visibility = prompt("Insert Method Visibility [1 public - 2 private - 3 protected]");
          switch (visibility) {
            case "1":
              visibility = "public";
              break;
            case "2":
              visibility = "private";
              break;
            case "3":
              visibility = "protected";
              break;
            default:
              visibility = null;
              break;
          }
        }
        args = prompt("Insert Method Arguments [Empty accepted]");
        args = args == null ? "" : args;
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
      mode = "default";
      console.log("default");
      alert(printClasses());
      break;
    case "g":
      mode = "default";
      console.log("generate");
      arr.forEach(download);
      break;
    default:
      mode = "default";
      console.log("default");
      break;
  }
}

function download(el) {
  file = new File([printClass(el)], arr[i].name + '.cs', { type: 'text/plain', })
  link = document.createElement('a')
  url = URL.createObjectURL(file)
  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
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
    "Rules:\nClick 1 to enter create mode\nClick 2 to enter drag mode\nClick 3 to enter inherit bind mode\nClick 4 to add attributes\nClick 5 to add methods\nClick 6 to print rules\nClick p to print the classes\nClick g to generate the classes\nClick a random key to enter view mode."
  );
}
