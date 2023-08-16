import random

class Animal:
    def __init__(self):
        self.age = -1
        self.sex = random.choice(["M", "F"])
    
    def is_egg(self):
        return True if self.age == -1 else False
    
    def is_young(self):
        return True if self.age == 0 else False
        
    def is_adult(self):
        return True if self.age >= 1 else False
        
    def is_old(self):
        return True if self.age > 3 else False
    
    def is_male(self):
        return True if self.sex == "M" else False
        
    def is_female(self):
        return True if self.sex == "F" else False
    
    def is_mature(self):
        return True if (self.age >= 1 and self.age <= 3) else False
    
class Animals:
    def __init__(self,n):
        self.animals = []
        self.add(n)
        if n == 2:
            self.animals[0].sex = "M"
            self.animals[0].sex = "F"
    
    def add(self,n):
        for i in range(n):
            self.animals.append(Animal())

    def grow(self):
        for a in self.animals:
            a.age += 1
        self.remove_olds()

    def mate(self):
        self.add(min(self.count_mature_male(),self.count_mature_female())*24)

    def remove_olds(self):
        self.animals = [a for a in self.animals if not a.is_old()]
    
    def count_adults(self):
        return len([a for a in self.animals if a.is_adult()])
    
    def count_youngs(self):
        return len([a for a in self.animals if a.is_young()])
    
    def count_eggs(self):
        return len([a for a in self.animals if a.is_egg()])
    
    def count_old(self):
        return len([a for a in self.animals if a.is_old()])

    def count_male(self):
        return len([a for a in self.animals if a.is_male()])

    def count_female(self):
        return len([a for a in self.animals if a.is_female()])

    def count_mature_male(self):
        return len([a for a in self.animals if (a.is_male() and a.is_mature())])

    def count_mature_female(self):
        return len([a for a in self.animals if (a.is_female() and a.is_mature())])

animals = Animals(2)
year = 0
print(animals.count_adults(), animals.count_youngs(), animals.count_eggs(), year)
for i in range(10):
    animals.grow()
    animals.mate()
    year += 1
    print(animals.count_adults(), animals.count_youngs(), animals.count_eggs(), year)