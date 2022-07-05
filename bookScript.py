a="""<div class="book">
  <div class="side spine">
    <span class="spine-title">"""
b="""</span>
    <span class="spine-author">"""
c="""</span>
  </div>
  <div class="side top"></div>
  <div class="side cover" style="background-image: url('https://covers.openlibrary.org/b/OLID/XXXXXM-M.jpg');"></div>
</div>\n"""
s=''
print('--------------')
for i in range(50):
    my=''
    initial=input("initial:")
    for j in initial.split(' '):
      my+=j[0]+'. '
    my=my[:-1]
    title=input("name:")
    s+=a+title+b+my+c
    print(s)