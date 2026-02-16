/// Datos Primitivos 7 tipos
{
    // Cadenas de texto (string)
    let name = "Gustavo"
    let alias = 'FranGuh'
    let email = `gitrafuh@gmail.com`
    // Números (number) - 64 bits
    let age = 23
    let height = 1.65
    // Booleanos (boolean)
    let isStudent = true
    let isTeacher = false
    // Undefined
    let undefinedValue
    // Null
    let nullValue = null
    // Simbolos (Symbol)
    let mySymbol = Symbol("mysymbol") // Es único
    // BigInt - usa toda le memoria de la maquina
    let myBigInt = BigInt(20000000022222222000000002222222200000000222222220000000022222222000000002222222)
    let myBigInt2 = 20000000022222222000000002222222200000000222222220000000022222222000000002222222n
    // comprobar tipo de dato
    console.log(typeof(mySymbol))
    console.log(typeof name)
    console.log(typeof undefinedValue)
    console.log(typeof nullValue)
    console.log(typeof null)
}
