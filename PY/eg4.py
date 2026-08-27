a=0
s=0
def st(arr,t):
    sum1=0
    
    e=len(arr)-t
    while e>=0:
        s=sum(arr[e:e+t])
        if s>sum1:
            sum2=arr[e:e+t]
            sum1=sum(sum2)
        e-=1
    return sum2
print(st([1,2,3,4,5],3))
