import uuid
import random


def page_writer(id, path, htmlpage):
    f = open(path if path != None else "" +id+".html", "w")
    f.write(htmlpage)
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


def generate_index_page(myuuids):
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
    page_writer(id='index', path=None, htmlpage=htmlpage)

def generate_pages(number_of_pages):
    if number_of_pages < 1:
        return
    myuuids = [str(uuid.uuid4()) for _ in range(number_of_pages)]
    generate_index_page(myuuids=myuuids)
    content = read_content("content.txt")
    for myuuid in myuuids:
        hyperlinks_to_reference = random_subset(
            arr=myuuids, size=random.randint(3, 9))
        htmlpage = generate_page(
            id=myuuid, hyperlinks_to_reference=hyperlinks_to_reference, content=content)
        page_writer(id=myuuid, path=None, htmlpage=htmlpage)


def main():
    number_of_pages = 100
    generate_pages(number_of_pages=number_of_pages)


if __name__ == "__main__":
    main()
