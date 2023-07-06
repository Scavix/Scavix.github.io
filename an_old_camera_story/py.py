directory1 = "photos/12_04_2023/"
directory2 = "photos/14_04_2023/"
directory3 = "photos/18_04_2023/"
directory4 = "photos/09_05_2023/"
directory5 = "photos/23_05_2023/"
directory6 = "photos/20_06_2023/"
directory7 = "photos/04_07_2023/"
fileExtension = ".JPG"
print("--------------------")
for i in range(3571, 3604):
    print('"'+directory1+"100_" + str(i) + fileExtension+'",')
print("--------------------")
for i in range(3612, 3628):
    print('"'+directory2+"100_" + str(i) + fileExtension+'",')
print("--------------------")
for i in range(3631, 3659):
    print('"'+directory3+"100_" + str(i) + fileExtension+'",')
print("--------------------")
for i in range(3828, 3859):
    print('"'+directory4+"100_" + str(i) + fileExtension+'",')

print("--------------------")
for i in range(3859, 3874):
    print('"'+directory5+"100_" + str(i) + fileExtension+'",')
print("--------------------")
for i in range(3907, 3948):
    print('"'+directory6+"100_" + str(i) + fileExtension+'",')
print("--------------------")
for i in range(150, 189):
    print('"'+directory7+"DSCN" + str(i) + fileExtension+'",')