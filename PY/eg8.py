import time 
def et(f):
    def wrapper(*args,**kwargs):
        st=time.time()


        result=f(*args,**kwargs)


        et=time.time()
        print(f"function'{f.__name__}'took {et -st:.4f} sec")
        return result
    return wrapper

def h(n):
    return sum( i* i for i in range (n))
h(10000000)