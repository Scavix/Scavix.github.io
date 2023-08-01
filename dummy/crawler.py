from bs4 import BeautifulSoup
import requests

def gotoandgimme(u, depth, visited):
    if depth == 0:
        return
    depth = depth -1
    response = requests.get(url+u)
    soup = BeautifulSoup(response.content, 'html.parser')
    print(soup.find_all('h1'))
    found = soup.find_all('a', href=True)
    for a in found:
        if a['href'] in visited:
            continue
        else:
            visited.append(a['href'])
            gotoandgimme(a['href'],depth,visited)

url = "http://scavix.github.io/dummy/"
response = requests.get(url+"51a9d42e-8a90-4848-9456-db67f5058abc.html")
soup = BeautifulSoup(response.content, 'html.parser')
print(soup.find_all('h1'))
found=soup.find_all('a', href=True)
for a in found:
    gotoandgimme(a['href'],4,[a['href']])
