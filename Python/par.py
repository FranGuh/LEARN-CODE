class Arreglo:
    def __init__(self, arreglo):
        self.arreglo = arreglo
        
        
    def RetornandoPares(self):
        temp = []
        for num in self.arreglo:
            if( num%2 == 0):
                temp.append(num)
        return temp
    
    def imprimir(self):
        return print(self.arreglo)

# Aqui me trabe no sabia como inicializar este conocimiento
entrada = Arreglo([i for i in range(1,8)])
entrada.imprimir()
salida = entrada.RetornandoPares()
print(salida)