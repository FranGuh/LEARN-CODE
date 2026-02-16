#level 1 O(n^2)
arreglo = [1, 2, 3, 2, 5]
arreglo2 = [1,2,3,4]
def hayRepetidos(arreglo):
    num_vistos = {}
    for i in range(0,len(arreglo)):
        contador = 0
        for y in range(0,len(arreglo)):
            if( y != i ):
                if( arreglo[i] == arreglo[y]):
                    contador=contador+1
                    return arreglo[i]
    return None    
    
                
print(hayRepetidos(arreglo))
print(hayRepetidos(arreglo2))

def hayRepetidosOn(arreglo):
    vistos = {}
    for num in arreglo:
        if (num in vistos):
            return num
        vistos[num] = True
    return None
    
print(hayRepetidosOn(arreglo))
print(hayRepetidosOn(arreglo2))


#level2
# level 2 O(n)

def sumaEsIgual(arreglo, valor):
    visto = {}
    for num in arreglo:
        x = valor - num
        if (x in visto):
            return True
        visto[num] = True
    return False
        