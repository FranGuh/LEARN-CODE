class BaseDeDatos {
    static instancia: BaseDeDatos | null = null;
    id;
    
    constructor() {
        if (BaseDeDatos.instancia !== null) {
            console.log("Existe, conexión, reconectando...");
            console.log(`Conexion a BD: ${BaseDeDatos.instancia.id}`);
            return BaseDeDatos.instancia;
        }
        
        this.id = Math.random();
        console.log(`Conexion a BD: ${this.id}`);
        
        BaseDeDatos.instancia = this;
    }
}

const conexion1 = new BaseDeDatos();
const conexion2 = new BaseDeDatos();
const conexion3 = new BaseDeDatos();

console.log(`Son iguales? ${conexion1=== conexion2}`);
