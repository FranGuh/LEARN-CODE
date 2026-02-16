# no usar all
# no usar list
# usar for
# retornar temprano
arreglo = [1,2,3]
arreglo_nega = [1,-2,3]

def SonPositivos(arreglo):
    for num in arreglo:
        if (num < 0):
            return False
    return True
    
print(SonPositivos(arreglo))
    
print(SonPositivos(arreglo_nega))