// ComparandoVelocidad.js

const desgasteVueltas1 = [10, 2, 5, 3];
const objetivos = 13;

function encontrarParOptimizado(arr:any,esp:any){
    const vistos:any = {};
    
    for(let i = 0; i < arr.length; i++){
        let actual = arr[i];
        
        let necesario = esp - actual;
        
        if(vistos[necesario] !== undefined){
            console.log(`Record de pista, Encontrado: ${actual} (ahora) + ${necesario} (visto antes)`);
            return [vistos[necesario],1];
        }
        
        vistos[actual] = i;
        console.log(`Memoria actual: ${vistos}`);
    }
    return null;
}

encontrarParOptimizado(desgasteVueltas1, objetivos);