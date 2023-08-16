adults = 2
eggs = 0
youngs = 0
year = 0
print(adults, youngs, eggs, year)
for i in range(10):
    adults += youngs
    youngs = eggs
    eggs = adults * 24
    year += 1
    print(adults, youngs, eggs, year)