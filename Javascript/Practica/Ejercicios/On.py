class Arreglo:
    def __init__(self, arreglo):
        self.arreglo = arreglo
        
    def invertir(self):
        arregloInvertido = []
        temp = self.arreglo[:]
        for i in range((len(self.arreglo))):
            arregloInvertido.append(temp.pop())
        print(arregloInvertido)
        return arregloInvertido
        
    def pares(self):
        arregloPares = []
        for i in range((len(self.arreglo))):
            if( self.arreglo[i]%2 == 0 ):
                arregloPares.append(self.arreglo[i])
        print(arregloPares)
        return arregloPares
        
    def busquedaTotal(self, valor):
        temp = {}
        diccionarioValor = {}
        totalSuma = 0
        for i in range((len(self.arreglo))):
            for y in range(i+1,(len(self.arreglo))):
                totalSuma = valor - self.arreglo[i]
                diccionarioValor[self.arreglo[i]] = totalSuma
                if( self.arreglo[i] + self.arreglo[y] == valor):
                    print(f'Se encontro el total {valor}, En el valor {self.arreglo[i]} + {self.arreglo[y]}')
                    temp[self.arreglo[i]]=self.arreglo[y] 
        return temp
    
    def busquedaTotalOn(self, valor):
        vistos = set()
        encontrados = {}
        for num in self.arreglo:
            complemento = valor - num
            if complemento in vistos:
                print(f'Se encontró: {complemento} + {num} = {valor}')
                encontrados[complemento] = num
            vistos.add(num)
        
        if not encontrados:
            print('No se encontro')
        
        return encontrados
        
    def imprimir(self):
        print(self.arreglo)
        
b = Arreglo([i**2 for i in range(1,14)])
#b.invertir()
#b.pares()
b.imprimir()
print(b.busquedaTotal(170))
print(b.busquedaTotalOn(170))