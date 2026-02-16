//Tienes un Array de números que representan el desgaste de los neumáticos en cada vuelta de un GP.
// Necesitas encontrar si existen dos vueltas específicas donde el desgaste sumado sea exactamente 
// un valor objetivo X.
const desgasteVueltas = [5, 8, 2, 10, 15, 3];
const objetivo = 13;
function encontrarVueltas(arr:any, esperado:any){
    let contador=0;
    let temp = desgasteVueltas[contador];
    while(contador<desgasteVueltas.length-1){
        let vueltasObjetivo=temp+desgasteVueltas[contador+1]
        if(vueltasObjetivo!==objetivo){
            console.log(`${desgasteVueltas[contador]} + ${desgasteVueltas[contador+1]} !== ${objetivo} : Por tanto, No suma lo esperado con la siguiente vuelta.`);
        }else{
             console.log(`${desgasteVueltas[contador]} + ${desgasteVueltas[contador+1]} == ${objetivo} : Por tanto, si suma lo esperado con la siguiente vuelta.`);
             esperado=vueltasObjetivo; 
        }
        contador++;
    }
    console.log(`Se ha terminado el arreglo, no hay siguiente vuelta , última vuelta registrada: ${desgasteVueltas[contador]}`)
    return esperado;
}
encontrarVueltas(desgasteVueltas,13);

encontrarVueltas(desgasteVueltas,1);

// codigo bien pero logica mal estoy solo comparando un indice 
// con el siguiente no con los demas debo usar otro ciclo for.