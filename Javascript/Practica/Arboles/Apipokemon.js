class Pokemon{
    constructor(id, nombre){
        this.id = id;
        this.nombre = nombre;
    }
}
// Ejemplo de uso futuro:
// const miPoke = new Pokemon(datos.name, datos.id);
let Pokemons = [];
async function consultar(nombre){

    const nombreLimpio = nombre.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nombreLimpio}`;
    try {
        console.log("Consultando API", nombreLimpio);
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Pokémon no encontrado (Status: ${respuesta.status})`);
        }
        const datos = await respuesta.json();
        console.log("Nombre: ", datos.name);
        console.log("Id: ", datos.id);
        const nuevoPokemon = new Pokemon(datos.id, datos.name);
        Pokemons.push(nuevoPokemon)
    } catch (error) {
        console.log("Lo siento hubo un error", error);
    }
}

await consultar("Pikachu");
await consultar("Agumon");
await consultar("lucario")

console.log(Pokemons);