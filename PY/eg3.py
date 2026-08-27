def i(arr,t):
    l=0
    i1=0
    while l<len(arr):
        # i1=0
        i2=0
        for i in arr:
            if arr[l]+i==t & i1!=i2:
                return i1,i2
            i2+=1
        i1+=1
        l+=1
print(i([1,2,3,4,5],2))