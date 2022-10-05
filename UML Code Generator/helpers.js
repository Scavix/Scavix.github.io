function mouseClicked() {
  if (mode == "create") {
    let val;
    while (val == null) {
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
          arr[oldSelectedClass].inheritsFrom=arr[currentSelectedClass];
          console.log(oldSelectedClass);
          arr[oldSelectedClass].inherits = true;
          console.log("bindCreated");
          resetSelectedClasses();
        }
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