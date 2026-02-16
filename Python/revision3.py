arr = [1, 5, 3, 4, 2]
arr2 = [1,2,3]

def DiferenciaEn(arreglo, valor):
    Temp = set()
    for num in arreglo:
        if( num - valor in Temp or num + valor in Temp):
            return True
        Temp.add(num)
    return False
    
print(DiferenciaEn(arr,2))
print(DiferenciaEn(arr2,5))