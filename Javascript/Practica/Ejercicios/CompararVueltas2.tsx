//Tienes un Array de números que representan el desgaste de los neumáticos en cada vuelta de un GP.
// Necesitas encontrar si existen dos vueltas específicas donde el desgaste sumado sea exactamente un valor objetivo X.
const desgasteVuelta2 = [5, 8, 2, 10, 15, 3];
const desgasteVuelta = [10, 2, 5, 3];

const objetiv = 13;

function encontrarPar(arr:any, meta:any){
    console.log("________________________________________________");
    for(let i=0; i<arr.length;i++){
        for(let j=i+1; j<arr.length;j++){
            console.log(`Comparando índices ${i} y ${j}: ${arr[i]} + ${arr[j]}`);
            if(arr[i]+arr[j]==meta){
                console.log(`Suman lo mismo que ${meta}!`);
            } else{
                console.log(`No suman lo mismo que ${meta} :(`);
            }
        }
    }
    return false;
}

encontrarPar(desgasteVuelta2,objetiv);

encontrarPar(desgasteVuelta,objetiv);



// codigo bien pero logica mal estoy solo comparando un indice con el siguiente no con los demas debo usar otro ciclo for.