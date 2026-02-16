// factorial.js
function calcularFactorial(n:number): number {
    if (n === 1 || n === 0){
        return 1;
    }
    
    console.log(`Numero ${n}, calculando factorial ${n-1} esperando...`);
    
    let respuestaDelHijo = calcularFactorial(n-1);
    
    return n * respuestaDelHijo;
    
}

console.log("Resultado final:", calcularFactorial(5));