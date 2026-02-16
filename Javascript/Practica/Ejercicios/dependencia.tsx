// piezas

class Piloto {
    nombre:String;
    constructor(nombre:string) { this.nombre=nombre; }
    conducir() { return `${this.nombre} esta en el límite.`;}
}

class AnalizadorTelemetria {
    calcularPromedio(vueltas:number[]):number {
        // promedio simple O(n) sin usar librerias.
        if (vueltas.length === 0) return 0;
        let suma = 0;
        for (let i = 0; i < vueltas.length; i++){
            suma += vueltas[i];
        }
        return suma / vueltas.length;
    }
}

class Carrera {
    piloto:Piloto;
    analizador:AnalizadorTelemetria;
    constructor(alistarPiloto:Piloto, analizadorTipo:any) {
        this.piloto = alistarPiloto;
        this.analizador = analizadorTipo;
    }
    
    iniciar(vueltas:number[]) {
        const estado = this.piloto.conducir();
        const promedio = this.analizador.calcularPromedio(vueltas);
        console.log(`Reporte: ${estado} | Promedio de vuelta: ${promedio}s`);
    }
}

const miPiloto = new Piloto("Max Verstappen");
const miAnalizador = new AnalizadorTelemetria();

const gpMexico = new Carrera(miPiloto, miAnalizador);
gpMexico.iniciar([80.5,79.2,81.1]);