import copy

o=[[1,2],[3,4]]

sc=copy.copy(o)
dc=copy.deepcopy(o)

dc[0][0]=99
# sc[0][0]=99
print(o)