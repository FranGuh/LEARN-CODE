entrada = [ 2, 3, 4, 2, 3, 5, 4, 4] # 5

entrada2 = [1,1,2,2,3,3]

def NoSeRepite(arreglo):
    diccionario = {}
    vistos = {}
    for num in arreglo:
        if (num in vistos):
            diccionario[num] +=  1
        else:
            diccionario[num] = 0
        vistos[num] = True
    print(diccionario)
    for num in diccionario:
        if (diccionario[num] == 0):
            return num
    

print(NoSeRepite(entrada))
print(NoSeRepite(entrada2))