// short-circuit

// mini teoria
// [] || {} = [] devuelve el primero que evalua en true
// [] && {} = {} devuelve el último que evalua en true

// Falsy
// Falso
// false
// 0
// ''
// null
// undefined
// NaN

let nombre = '';
let username = nombre || 'Anonimo';
console.log(username);

function fn1() {
    console.log('Soy función 1');
    return false;
}

function fn2() {
    console.log('Soy función 2');
    return true;
}

let x = fn1() && fn2();  // funcion 1
// ejecutar una logica que una logica anterior devuelva true.


