console.log("-----Busqueda O(n)----------")

let arreglo = []
function add(valor:number){
    arreglo.push(valor)
}
// que pasa si busco el primero y el ultimo a la vez...
// buscando de 2 en 2
function find(valor:number){
    let temp = [...arreglo]
    for( let i = 0; i < arreglo.length ; i++ ){
        for( let y = i + 1; y < arreglo.length ; y++){
            if ( temp[i] === valor){
                return i;
            } else if ( temp[y] === valor){
                return y;
            } else {
            }
        }
    }
    return false
}
function remove(valor:number){
    let numeroABuscar = find(valor)
    let nuevoArreglo = []
    let temp = [...arreglo]
    let i = 0
    while ( i< arreglo.length){
        let sale = 0;
        if( i !== numeroABuscar){
            sale = temp.pop()
            nuevoArreglo.push(sale)
        } else {
            sale = temp.pop();
        }
        i ++
    }
    return arreglo = nuevoArreglo;
}

add(5)
add(10)
add(3)
console.log(arreglo)
console.log(find(10))
console.log(find(7))
console.log(remove(10))
console.log(find(10))
add(7)
console.log(arreglo)
console.log(find(7))
console.log(find(5))


