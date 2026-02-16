arr = ["Hola", "mundo", "hola", "Python"]

def encontrarNoRepetido (arreglo):
    visto = {}
    temp = 0
    dicContador = {}
    for arg in arreglo:
        temp = str(arg.lower());
        if( temp in visto ):
            dicContador[temp] += 1
        else:
            dicContador[temp] = 0
        visto[temp] = temp
    for arg in dicContador:
        if( dicContador[arg] == 0):
            return arg
        
print(encontrarNoRepetido(arr));

# sin muleta>

def encontrarNoRepetido (arreglo):
    dicContador = {}
    
    for arg in arreglo:
        temp = arg.lower()
        if temp in dicContador:
            dicContador[temp] += 1
        else:
            dicContador[temp] = 0
            
    for arg in arreglo:
        if dicContador[arg.lower()] == 0:
            return arg
    return None
print(encontrarNoRepetido(arr));

# diccionario puede ser vistos y contador
## existencia → ya lo vi
## valor → cuántas veces

# dicContador → una tabla de conteo
#arreglo → la fila original de personas

    # “primer elemento que…”
    # “en el orden dado”
    # “el primero en aparecer”