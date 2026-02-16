import Proyecto from "./Proyecto.js";

class GestorProyectos{
    constructor() {
        this.datos = [];
    }

    agregar(nombre, tecnologia){

        if (esNuloOVacio(tecnologia) || esNuloOVacio(nombre)){
                return Promise.reject(new Error("Datos invalidos: Campos vacíos"));
        } else {
            // promesa
            return new Promise((resolver) => {
                setTimeout(() => {
                    const nuevoProyecto = new Proyecto(nombre,tecnologia);

                    this.datos.push(nuevoProyecto);

                    console.log("Datos guardados");
                    resolver(nuevoProyecto);
                }, 1000)
            }); 
        }
    }
}


function esNuloOVacio (str){
    return (
        str === null ||
        str === undefined ||
        (typeof str === 'string' && str.trim().length ===0) // vacio o espacio
    );
}


async function sistemaProyecto(){
    const gestor = new GestorProyectos();

    console.log("------INICIANDO-------------");

    try {
        console.log("Test 1............ guardando normal.......");
        await gestor.agregar("API portfolio","NodeJS");
        console.log("Test 2............ guardando vacio.......");
        await gestor.agregar("","NodeJS");
         console.log("Test 3............ guardando normal.......");
        await gestor.agregar("API Retorno","NodeJS");
    } catch (error) {
        console.log("Ha ocurrido un error ",error);
        
    }
    console.log("Tests Finalizados")
    console.log("Proyectos totales", gestor.datos);
}

sistemaProyecto();