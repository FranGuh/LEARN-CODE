let user = {
    id: 1,
    name: 'Chanchito',
    age: 25,
};
// para iterar propiedades
for (let propiedad in user) {
    console.log(propiedad, user[propiedad]);
}

// para iterar arreglos es relativamente nueva

let animales = ['Chanchito','Dragon', 'Perro'];
for (let indice in animales) {
    console.log(indice, animales[indice]);
}

// mejor utilizar for of
