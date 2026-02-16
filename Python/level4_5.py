arreglo = [1,2,3,4]
arreglo2 = [1,2,3,2]
arreglo3 = [5]
arreglo4 = []


def SonUnicos(arr):
    arrVisto = {}
    for num in arr:
        if (num in arrVisto):
            return False
        arrVisto[num] = True
    return True
    
print(SonUnicos(arreglo))
print(SonUnicos(arreglo2))
print(SonUnicos(arreglo3))
print(SonUnicos(arreglo4))

arreglo = [2,3,4,2,3]
arr2 = [1,2,3,4]
arr3 = [5,5,5]
arr4 = []

def HayRepetido(arr):
    vistos = {}
    for num in arr:
        if(num in vistos):
            return num
        vistos[num] = True
    return None

print(HayRepetido(arreglo))
print(HayRepetido(arr2))
print(HayRepetido(arr3))
print(HayRepetido(arr4))