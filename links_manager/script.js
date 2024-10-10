const linkNameInput = document.getElementById("linkName");
const linkUrlInput = document.getElementById("linkUrl");
const addLinkButton = document.getElementById("addLink");
const linkList = document.getElementById("linkList");
const exportLinksButton = document.getElementById("exportLinks");
const importLinksButton = document.getElementById("importLinks");

let links = [];

function renderLinks() {
  linkList.innerHTML = "";
  links.forEach((link, index) => {
    const listItem = document.createElement("li");

    const linkAnchor = document.createElement("a");
    linkAnchor.href = link.url;
    linkAnchor.target = "_blank";
    linkAnchor.textContent = link.name;

    listItem.appendChild(linkAnchor);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editLink(index));

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeLink(index));

    listItem.appendChild(editButton);
    listItem.appendChild(removeButton);
    linkList.appendChild(listItem);
  });
}

function addLink() {
  const name = linkNameInput.value.trim();
  const url = linkUrlInput.value.trim();

  if (name && url) {
    links.push({ name, url });
    linkNameInput.value = "";
    linkUrlInput.value = "";
    renderLinks();
  }
}

function editLink(index) {
  const link = links[index];
  linkNameInput.value = link.name;
  linkUrlInput.value = link.url;
  links.splice(index, 1);
  renderLinks();
}

function removeLink(index) {
  links.splice(index, 1);
  renderLinks();
}

function exportLinks() {
  const linksJson = JSON.stringify(links);
  const downloadLink = document.createElement("a");
  downloadLink.href =
    "data:text/json;charset=utf-8," + encodeURIComponent(linksJson);
  downloadLink.download = "links.json";
  downloadLink.click();
}

function importLinks() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".json,.txt";

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        if (file.name.endsWith('.json')) {
          links = JSON.parse(reader.result);
          renderLinks();
        } else if (file.name.endsWith('.txt')) {
          links = JSON.parse(helper(reader.result));
          console.log(links);
          renderLinks();
        } else {
          throw new Error("Unsupported file type");
        }
      } catch (error) {
        console.error("Error processing file:", error);
      }
    };

    reader.readAsText(file);
  });

  fileInput.click();
}

function helper(content) {
  const urls = content.split('\n').filter(url => url.trim() !== '');
  const jsonArray = urls.map(url => {
    const trimmedUrl = url.trim();
    const name = trimmedUrl.replace(/^https?:\/\//, '').split('/')[0];
    return { name, url: trimmedUrl };
  });
  return JSON.stringify(jsonArray);
}

addLinkButton.addEventListener("click", addLink);
exportLinksButton.addEventListener("click", exportLinks);
importLinksButton.addEventListener("click", importLinks);
