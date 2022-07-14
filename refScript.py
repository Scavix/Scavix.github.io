a="""<li><a href = \""""
b="""\">"""
c="""</a></li>\n"""
s=''
print('--------------')
for i in range(int(input('how many?'))):
    link=input("link:")
    name=input("name:")
    s+=a+link+b+name+c
print(s)
    