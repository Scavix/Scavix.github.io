import requests
import PySimpleGUI as sg
from bs4 import BeautifulSoup
from datetime import datetime
import os.path

def main():
    outstr = ""
    try:
        if os.path.isfile("cache.tmp"):
            f = open("cache.tmp", "r")
            outstr = f.read()
            f.close()
            os.remove("cache.tmp")
    except Exception as e:
        print(e)
        pass
    layout = [  [sg.Text('Enter URL'), sg.InputText(key='-URL-', default_text='insert URL here')],
                [sg.Multiline(expand_x=True, expand_y=True, key='-OUTPUT-', default_text=outstr)],
                [sg.Button('Add'), sg.Button('Generate Source'), sg.Button('Exit and Save'), sg.Button('Exit')]]

    window = sg.Window('Url generate', layout, element_justification='c', finalize=True, size=(600, 200))

    try:
        while True:
            event, values = window.read()
            if event == sg.WIN_CLOSED or event == 'Exit and Save':
                break
            if event == 'Exit':
                os.remove("cache.tmp")
                break
            elif event == 'Generate Source':
                response = requests.get("https://scavix.github.io/helper_links.py")
                if response.status_code == 200:
                    f = open("helper_links.py", "w")
                    f.write(response.text)
                    f.close()
                    sg.popup("Done")
                else:
                    sg.popup("Web site does not exist or is not reachable")
            elif event == 'Add':
                url=window['-URL-'].get()
                headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
                }
                response = requests.get(values['-URL-'], headers=headers)
                if response.status_code == 200:
                    if response.headers['Content-Type'].__contains__('application/pdf'):
                        title = url.split('/')[-1]
                        outstr += "<li><a href = \"" + str(url).strip() + "\">" + str(title) + "</a></li>\n"
                    elif not response.headers['Content-Type'].__contains__('text/html'):
                        sg.popup("Web site is not HTML")
                        continue
                    else:
                        soup = BeautifulSoup(response.content, 'html.parser')
                        title = soup.title.string
                        outstr += "<li><a href = \"" + str(url).strip() + "\">" + str(title) + "</a></li>\n"
                        save_to("cache.tmp",outstr)
                else:
                    sg.popup("Web site does not exist or is not reachable")
            
                window['-OUTPUT-'].update(value=outstr)
                window['-URL-'].update(value="")
    except:
        save_to("cache.tmp", outstr)        
        sg.popup("Found exception, cache saved")
    window.close()
    
def save_to(dir,myStr):
    f = open(dir, "w")
    f.write(myStr)
    f.close()

if __name__ == "__main__":
    main()