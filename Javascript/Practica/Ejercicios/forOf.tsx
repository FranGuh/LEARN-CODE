class Mecanico {
    nombre:string;
    constructor(nombre:string) {this.nombre = nombre;}
    
    //interfaz
    escuchar(mensaje:string) {
        console.log(`${this.nombre} copió: "${mensaje}" -> Preparando neumáticos.`)
    }
}

class RadioF1 {
    oyentes:Array<any>;
    constructor() {
        this.oyentes = [];
    }
    
    suscribir(nuevoOyente:Mecanico) {
        this.oyentes.push(nuevoOyente);
        console.log("nueva radio conectada.")
    }
    
    transmitir(mensaje:string) {
        console.log(`Radio dice: ${mensaje}`);
        for (let oyente of this.oyentes){
            oyente.escuchar(mensaje);
        }
    }
}

const radioRedBull = new RadioF1();
const juan = new Mecanico("Juan");
const pedro = new Mecanico("Pedro"); 

radioRedBull.suscribir(juan);
radioRedBull.suscribir(pedro);

radioRedBull.transmitir("BOX BOX BOX");

class Cocinero {
    estacion:string;
    constructor(estacion:string){
        this.estacion = estacion;
    }
    
    trabajar(platillo:string){
        console.log(`cocinero de ${this.estacion}: Escuchado chef! Preparando ${platillo}.`)
    }
    
}

class JefeDeCocina {
    equipo:any;
    constructor() {
        this.equipo = [];
    }
    
    contratar(nuevoCocinero:Cocinero){
        this.equipo.push(nuevoCocinero);
        console.log(`Nuevo fichaje de la estación: ${nuevoCocinero.estacion}`);
        
    }
    
    gritarOrden(platillo:string){
        console.log(`Chef: Marchando una orden de ${platillo}!`);
        
        for (let cocinero of this.equipo) {
            cocinero.trabajar(platillo);
        }
    }
}

const gordon = new JefeDeCocina();
const luigi = new Cocinero("Pastas");
const mario = new Cocinero("Pizzas");

gordon.contratar(luigi);
gordon.contratar(mario);

console.log("Servicio empieza");
gordon.gritarOrden("Pizza Napolitana");