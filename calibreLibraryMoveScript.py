import sys, os, shutil

root = "/Vagabond/copia/"

for path, subdirs, files in os.walk(root):
    for name in files:
        print(os.path.join(path, name))
        tmp=os.path.join(path, name)
        if tmp.lower().endswith(('.pdf')):
        	shutil.move(tmp,os.path.join(tmp, "../../"))
	