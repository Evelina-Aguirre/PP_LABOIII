export default class Vehiculo {

    constructor(id, modelo, anoFab,velMax) {
      if (id === "") {
        Vehiculo.ultimoId = (Vehiculo.ultimoId || 0) + 1;
        this.id = Vehiculo.ultimoId;
      } else {
        this.id = id;
      }
     
    
      this.modelo = modelo || Sin_Modelo;
      this.anoFab=anoFab ||Sin_anoFab;
      this.velMax =velMax;

    }


    toString() {
        return `Modelo: ${this.modelo}, Año: ${this.anoFab}, velocidad: ${this.velMax}`;
    }
  
    
    
  }
  
export function actualizarIds(datos) {
    let maxId = 0;
    datos.forEach((element) => {
      if (element.id > maxId) {
        maxId = element.id;
      }
    });
    Vehiculo.ultimoId = maxId;
  }
