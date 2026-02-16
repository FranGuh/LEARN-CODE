// se inicializa el arreglo
let arreglo = []
function reversaArreglo(){
    console.log("-----------REVERSA ARREGLO----------")
    print()
    let temporal = [];
    const longitud = arreglo.length
    while (arreglo.length > 0){
        temporal.push(arreglo.pop());    
    }
    console.log(`temp = ${temporal}`)
    console.log(`arr = ${arreglo}`)
    arreglo = temporal
    return arreglo;
}


function buscarValors(arreglo, valor:number){
    for(var i = 0; i < arreglo.length; i++ ){
        if (arreglo[i] === valor){
            return i;
        }
    }
    return null;
}

function insertarValorEnXPosicion(posicion:number, valor:number){
    let temporal = [];
    for(let i = 0; i < arreglo.length; i++){
        if (posicion === i){
            temporal.push(valor);
            temporal.push(arreglo[i]);
        } else {
            temporal.push(arreglo[i]);
        }
    }
    if (arreglo.length === posicion) {
        temporal.push(valor);
    }
    return temporal;
}

function remplazarValor(buscarValor, valor:number){
    let encontrado = buscarValors(arreglo, buscarValor);
    if( encontrado === null) {
        return null;
    } else {
        let temporal = [];
        for(let i = 0; i < arreglo.length; i++){
            if (encontrado !== i){
                temporal.push(arreglo[i]);
                //console.log(temporal);
            } else {
                temporal.push(valor);
            }
        }
        return temporal;
    }
}


function esNumero(valor:number):boolean{
    return Number.isInteger(valor);
}

function insert(numeroInsertar:any){
    if (esNumero(numeroInsertar)){
        return arreglo.push(numeroInsertar);
    } else {
        return console.log("No es numero")
    }
}

function remove(){
    return arreglo.pop();
}

function print(){
    return console.log(arreglo);
}

insert(2)
insert(4)
insert(5)
insert(10)
reversaArreglo()
print()
console.log(buscarValors(arreglo, 4))
console.log(remplazarValor(5, 44))

console.log(insertarValorEnXPosicion(3,100))