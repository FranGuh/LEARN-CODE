arr = [2, 3, 4, 2, 3, 5, 4,6]
arr2 = [1, 1, 2, 2, 3, 3] 
arr3 = [7]
arr4 = []

def NoRepetido(arreglo):
    dicVistos = {}
    for num in arreglo:
        if(num in dicVistos):
            dicVistos[num] += 1
        else:
            dicVistos[num] = 0
    for num in arreglo:
        if(dicVistos[num] == 0):
            return num
    return None

    
print(NoRepetido(arr))
print(NoRepetido(arr2))
print(NoRepetido(arr3))
print(NoRepetido(arr4))