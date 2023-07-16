function mouseClicked() {
  if (mode == "create") {
    let val = null;
    while (val == null || val.trim() == "") {
      val = prompt("Insert Page Name [Empty not accepted]");
    }
    arr.push(new Page(val, createVector(mouseX, mouseY)));
  } else if (mode == "drag") {
    for (j = 0; j < arr.length; j++) {
      if (touchRetriever(arr[j])) {
        currentSelectedPage = j;
        arr[currentSelectedPage].drag = true;
        console.log("mouseClicked");
        for (i = 0; i < arr.length; i++) {
          if (i != currentSelectedPage) {
            arr[i].drag = false;
          }
        }
      }
    }
  } else if (mode == "bind") {
    for (j = 0; j < arr.length; j++) {
      if (touchRetriever(arr[j])) {
        oldSelectedClass = currentSelectedPage;
        currentSelectedPage = j;
        if (
          oldSelectedClass != null &&
          oldSelectedClass != currentSelectedPage
        ) {
          arr[oldSelectedClass].connections.push(arr[currentSelectedPage]);
          console.log("bindCreated");
          resetSelectedPages();
        }
      }
    }
  }
}

function touchRetriever(el) {
  return dist(mouseX, mouseY, el.v.x, el.v.y) < sizeOfPage / 2;
}

function touchMoved() {
  for (j = 0; j < arr.length; j++) {
    if (arr[currentSelectedPage] != null) {
      if (arr[currentSelectedPage].drag) {
        arr[currentSelectedPage].v.x = mouseX;
        arr[currentSelectedPage].v.y = mouseY;
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
      1;
      mode = "drag";
      console.log("drag");
      break;
    case "3":
      mode = "bind";
      console.log("bind");
      break;
    case "p":
      mode = "default";
      console.log("default");
      printRules();
      break;
    case "s":
      mode = "default";
      console.log("default");
      alert(showPages());
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
  file = new File([printPage(el)], arr[i].name + ".html", {
    type: "text/html",
  });
  link = document.createElement("a");
  url = URL.createObjectURL(file);
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function resetAll() {
  resetDrag();
  resetSelectedPages();
}

function resetDrag() {
  for (i = 0; i < arr.length; i++) {
    arr[i].drag = false;
  }
}

function resetSelectedPages() {
  currentSelectedPage = null;
  oldSelectedPage = null;
}

function printRules() {
  alert(
    "Rules:\nClick 1 to enter create mode\nClick 2 to enter drag mode\nClick 3 to enter inherit bind mode\nClick p to print rules\nClick s to show the pages\nClick g to generate the pages\nClick a random key to enter view mode."
  );
}
