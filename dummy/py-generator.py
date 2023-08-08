import uuid
import random
import os

def dir_check(path):
    if path == None:
        return
    if not os.path.exists(path):
        os.makedirs(path)

def page_writer(id, path, htmlpage):
    dir_check(path)
    f = open((path if path != None else "") + id+".html", "w")
    f.write(htmlpage)
    f.close()


def obsidian_writer(id, path, hyperlinks_to_reference):
    dir_check(path)
    f = open((path if path != None else "") + id+".md", "w")
    for hyperlink in hyperlinks_to_reference:
        f.write("[["+hyperlink+"]]"+"\n")
    f.close()


def d3js_writer(path, data):
    dir_check(path)
    f = open((path if path != None else "") + "data.json", "w")
    f.write('{"nodes":[')
    for key in data.keys():
        f.write('{"id":"'+key+'"}' + (',' if key != list(data.keys())[-1] else '') + '\n')
    f.write('],"links":[')
    for key, value in data.items():
        for v in value:
            f.write('{"source":"'+key+'","target":"'+v+'"}' + ('' if ((key == list(data.keys())[-1]) and (v == value[-1])) else ',') + '\n')
    f.write(']}')
    f.close()


def read_content(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
    return content


def random_subset(arr, size):
    if size >= len(arr):
        return arr

    shuffled_arr = arr[:]
    random.shuffle(shuffled_arr)
    subset = shuffled_arr[:size]
    return subset


def generate_page(id, hyperlinks_to_reference, content):
    htmlpage = ''
    htmlpage += '<!DOCTYPE html><html lang="en"><head><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0"><style>.center {margin: auto;width: 60%;border: 3px solid #73AD21;padding: 10px;}p {font-size: 20px;  font-family: "Comic Sans MS", "Comic Sans", cursive;}</style><meta charset="UTF-8" /><title>'
    htmlpage += id
    htmlpage += '</title><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="description" content="" /><link rel="icon" href="favicon.png"></head><body><h1>'
    htmlpage += id
    htmlpage += '</h1>'

    chapters = random.sample(content.split('\n\n'), 5)
    chapters_picked_indexes = [i for i in range(len(chapters))]
    chapters_indexes_to_refer = random_subset(
        arr=chapters_picked_indexes, size=len(hyperlinks_to_reference))

    for i in range(len(chapters)):
        if i in chapters_indexes_to_refer:
            words = chapters[i].split()
            hyperlink = hyperlinks_to_reference.pop()
            word_id = random.randint(0, len(words)-1)
            newword = '<a href="'
            newword += hyperlink
            newword += '.html">'
            newword += words[word_id]
            newword += '</a>'
            words[word_id] = newword

            for p in (" ".join(words)).split('\n'):
                htmlpage += '<p class = "center">'
                htmlpage += p
                htmlpage += '</p>'
        else:
            htmlpage += '<p class = "center">'
            htmlpage += chapters[i]
            htmlpage += '</p>'

    htmlpage += '</body></html>'
    return htmlpage


def generate_pages_index_page(myuuids, path):
    htmlpage = ''
    htmlpage += '''<!DOCTYPE html><html lang="en"><head>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta charset="UTF-8" />
    <title>Index</title>
    <script>
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const pageNames = '''
    htmlpage += str([myuuids+'.html' for myuuids in myuuids])
    htmlpage += ''';
        const randomPageIndex = getRandomInt(0, pageNames.length - 1);
        const randomPageName = pageNames[randomPageIndex];
        function redirectToRandomPage() {
            window.location.href = randomPageName;
        }
        window.onload = function () {
            setTimeout(redirectToRandomPage, 10000); // Adjust the delay as needed
        };
    </script>
    </head><body>
    <h1>After 10 secs you'll be redirected to a random page...</h1>
    <button onclick="redirectToRandomPage()">Click here to go to a random page instantly</button>
    <p>If you are not redirected, <a href="#">click here</a>.if it still does not work <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">click here</a></p>
    </body></html>
    '''
    page_writer(id='index', path=path, htmlpage=htmlpage)

def generate_d3js_page(path):
    htmlpage = """
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>D3.js Network Graph Example</title>
          <script src="https://d3js.org/d3.v7.min.js"></script>
          <style>
            .link {
              stroke: #999;
              stroke-opacity: 0.6;
              fill: none;
            }

            #chart {
              text-align: center;
              margin: auto;
              position: absolute;
              top: 0;
              right: 0;
            }

            .selection {
              fill: none;
            }

            .node {
              fill: #ccc;
              stroke: #fff;
              stroke-width: 1.5px;
            }

            .node:hover,
            .highlight {
              fill: steelblue;
            }

            .label {
              font-size: 12px;
            }

            body {
              overflow: hidden; /* Hide scrollbars */
            }
          </style>
        </head>
        <body>
          <h1>D3.js Network Graph Example</h1>
          <div id="chart"></div>

          <script>
            // Load data from JSON file
            d3.json("data.json").then((data) => {
              const nodes = data.nodes;
              const links = data.links;

              // Set up the SVG canvas dimensions
              const width = window.innerWidth;
              const height = window.innerHeight;

              // Create the SVG container
              const svg = d3
                .select("#chart")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

              // Create the force simulation
              const simulation = d3
                .forceSimulation(nodes)
                .force(
                  "link",
                  d3
                    .forceLink(links)
                    .id((d) => d.id)
                    .distance(400)
                )
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(width / 2, height / 2));

              // Create links
              const link = svg
                .selectAll(".link")
                .data(links)
                .enter()
                .append("line")
                .attr("class", "link");

              // Create nodes
              const node = svg
                .selectAll(".node")
                .data(nodes)
                .enter()
                .append("circle")
                .attr("class", "node")
                .attr("r", 10)
                .call(
                  d3
                    .drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
                );

              // Add labels to nodes
              const labels = svg
                .selectAll(".label")
                .data(nodes)
                .enter()
                .append("text")
                .attr("class", "label")
                .text((d) => d.id)
                .style("display", "none");

              // Update positions on tick
              simulation.on("tick", () => {
                link
                  .attr("x1", (d) => d.source.x)
                  .attr("y1", (d) => d.source.y)
                  .attr("x2", (d) => d.target.x)
                  .attr("y2", (d) => d.target.y);

                node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

                labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
              });

              svg
                .selectAll(".node")
                .on("mouseover", function (event, d) {
                  svg
                    .selectAll(".node")
                    .filter((node) => isConnected(d, node))
                    .classed("highlight", true);

                  svg
                    .selectAll(".link")
                    .filter((link) => link.source === d || link.target === d)
                    .classed("highlight", true);

                  svg
                    .select(".label")
                    .style("display", "block")
                    .text(d.id)
                    .attr("x", d.x)
                    .attr("y", d.y - 10);
                })
                .on("mouseout", function () {
                  svg.selectAll(".node").classed("highlight", false);
                  svg.selectAll(".link").classed("highlight", false);
                  svg.select(".label").style("display", "none");
                });

              function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
              }

              function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
              }

              function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
              }

              // Check if two nodes are connected
              function isConnected(a, b) {
                return links.some((link) => link.source === a && link.target === b);
              }
            });
          </script>
        </body>
      </html>
    """
    page_writer(id='index', path=path, htmlpage=htmlpage)

def generate_index_redirect(path):
    htmlpage = """
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Redirect me</title>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="description" content="" />
          <link rel="icon" href="favicon.png" />
          <script>
            var showing = false;
            // Function to read the contents of a file
            function readFile(filePath, callback) {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", filePath, true);
              xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  callback(xhr.responseText);
                }
              };
              xhr.send();
            }

            function showMeTheCode() {
              // Load the code snippet from a file and display it in the <pre> tag
              readFile("py-generator.py", function (content) {
                var preTag = document.getElementById("codeSnippet");
                var codeTag = document.getElementById("codeBlock");
                preTag.textContent = content;
                  if (showing) {
                      preTag.style.display = "none";
                      showing = false;
                      codeTag.innerHTML = 'Show me the <a href=\"#\" onclick=\"showMeTheCode();return false;\">code</a>';
                  } else {
                      preTag.style.display = "block";
                      showing = true;
                      codeTag.innerHTML = 'Hide the <a href=\"#\" onclick=\"showMeTheCode();return false;\">code</a>';
                  }
              });
            }
          </script>
        </head>
        <body>
          <h1>Redirect me</h1>
          <p>Redirect me to the pages <a href="pages/">index</a></p>
          <p>Redirect me to the pages <a href="d3js/">graph</a></p>
          <p id = "codeBlock">
            Show the <a href="#" onclick="showMeTheCode();return false;">code</a>
          </p>
          <pre id="codeSnippet"></pre>
        </body>
      </html>
    """
    page_writer(id='index', path=path, htmlpage=htmlpage)

def generate_pages(number_of_pages):
    if number_of_pages < 1:
        return
    myuuids = [str(uuid.uuid4()) for _ in range(number_of_pages)]
    dictionary = {}
    generate_index_redirect(path=None)
    generate_pages_index_page(myuuids=myuuids, path="pages/")
    generate_d3js_page(path="d3js/")
    content = read_content("content.txt")
    for myuuid in myuuids:
        dictionary[myuuid] = random_subset(
            arr=myuuids, size=random.randint(3, 9))
    d3js_writer(path="d3js/", data=dictionary)
    for key, value in dictionary.items():
        obsidian_writer(id=key, path="obs/", hyperlinks_to_reference=value)
        htmlpage = generate_page(
            id=key, hyperlinks_to_reference=value, content=content)
        page_writer(id=key, path="pages/", htmlpage=htmlpage)


def main():
    number_of_pages = 100
    generate_pages(number_of_pages=number_of_pages)


if __name__ == "__main__":
    main()
