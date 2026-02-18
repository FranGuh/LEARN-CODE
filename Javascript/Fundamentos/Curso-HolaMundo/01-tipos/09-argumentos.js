function suma(variable, variableASumar) { // parametros
    console.log(arguments); //no recomendada
    return variable + variableASumar; 
}

let resultado = suma(5,0); // argumento
console.log(typeof resultado);
console.log(typeof suma);