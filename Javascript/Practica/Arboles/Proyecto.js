export default class Proyecto {
    constructor(nombre, tecnologia) {
        this.id = Date.now();
        this.nombre = nombre;
        this.tecnologia = tecnologia;
    }
}
