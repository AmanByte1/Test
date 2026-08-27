def a(arr,t):
    l=0
    sum=0
    r=len(arr)-1
    while l<=r:
        for i in arr:
            if sum==t:
                print(sum)
                # print("True")
                return True 
            sum=arr[l]+i
            print(sum)
        l=l+1
print(a([1,2,3,4,5],9))

