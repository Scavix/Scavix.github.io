import requests
import json
url=""
def areq(url):
    s = requests.Session()  
    data = {"username": "admin", "password": "admin"}
    response = s.post(url+'/login', json=data)
    token = json.loads(response.content)["csrf"]

    for i in range(4):    
        payload = {"csrf": token, "index":i}
        response = s.get(url+'/flag_piece', params=payload)
        token = json.loads(response.content)["csrf"]
        print(json.loads(response.content)["flag_piece"])


def areqq(url):
    payload = {"id":"flag"} 
    headers = {"X-password": "admin", "accept": "application/xml"}
    cookies = {"password": "admin"}
    data = {"username": "admin", "password": "admin"}
    response = requests.post(url,params=payload, json=data, headers=headers, cookies=cookies)
    print(response.text)

def areqqq(url):
    payload = {"id":"flag"}
    headers = {"X-password": "admin", "accept": "application/xml"}
    cookies = {"password": "admin"}
    response = requests.get(url,params=payload,headers=headers, cookies=cookies)
    print(response.text)