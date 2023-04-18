window.onload = function() {
	const imageFolder = "photos/";
	const imageContainer = document.getElementById("image-container");
	
	fetchImages(imageFolder)
		.then(images => {
			images.forEach(image => {
				const img = document.createElement("img");
				img.src = image;
				imageContainer.appendChild(img);
			});
		})
		.catch(err => console.log(err));
};

async function fetchImages(folder) {
	const response = await fetch(folder);
	const data = await response.text();
	const parser = new DOMParser();
	const html = parser.parseFromString(data, "text/html");
	const links = html.querySelectorAll("a");
	const images = [];

	links.forEach(link => {
		if (link.href.match(/\.(jpe?g|png|gif)$/i)) {
			images.push(link.href);
		}
	});

	return images;
}