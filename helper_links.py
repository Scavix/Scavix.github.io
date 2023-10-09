import requests
import PySimpleGUI as sg
from bs4 import BeautifulSoup
from datetime import datetime

def main():
    outstr = ""
    layout = [  [sg.Text('Enter URL'), sg.InputText(key='-URL-', default_text='isnert URL here')],
                [sg.Multiline(default_text="", expand_x=True, expand_y=True, key='-OUTPUT-')],
                [sg.Button('Ok'), sg.Button('Cancel'), sg.Button('Generate Source')]]

    window = sg.Window('Url generate', layout, element_justification='c', finalize=True, size=(600, 200))

    try:
        while True:
            event, values = window.read()
            if event == sg.WIN_CLOSED or event == 'Cancel':
                    break
            elif event == 'Generate Source':
                response = requests.get("https://scavix.github.io/helper_links.py")
                f = open("helper_links.py", "w")
                f.write(response.text)
                f.close()
            elif event == 'Ok':
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
                else:
                    sg.popup("Web site does not exist or is not reachable")
            
                window['-OUTPUT-'].update(value=outstr)
                window['-URL-'].update(value="")
    except:
        f = open(str(datetime.now()+"txt"), "w")
        f.write(outstr)
        f.close()
    window.close()

if __name__ == "__main__":
    main()