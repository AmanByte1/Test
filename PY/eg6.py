def rf(fn):
    with open(fn,'r') as file:
        return file.readlines()

def rf1(fn):
    with open(fn,'r') as file:
        for i in file:
            yield i


for l in rf("xyz.txt"):
    
    process(l)