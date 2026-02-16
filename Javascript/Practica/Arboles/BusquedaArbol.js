function busquedaArbol (arbol, numeroABuscar){
    if (arbol.valor === null || arbol.valor === numeroABuscar){
        return arbol;
    } else     if (numeroABuscar < arbol.valor){
        return busquedaArbol(arbol.left, numeroABuscar);
    } else {
        return busquedaArbol(arbol.right, numeroABuscar);
    }
}