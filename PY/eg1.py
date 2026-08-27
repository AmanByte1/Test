def ms(arr,n):

    n=(n*(n+1))//2

    an=sum(arr)

    return n-an
print(ms([1,2,4,6,5],6))