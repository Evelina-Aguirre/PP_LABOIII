export default class Vehiculo {

    constructor(id, modelo, anoFab,velMax) {
      if (id === "") {
        Vehiculo.ultimoId = (Vehiculo.ultimoId || 0) + 1;
        this.id = Vehiculo.ultimoId;
      } else {
        this.id = id;
      }
      if (typeof anoFab !== 'number' || !Number.isInteger(anoFab) || anoFab <= 1985 || edad >2023) {
        throw new Error('El año no es válido. Debe ser un año mayor a 1985.');
    }
      this.modelo = modelo || Sin_Modelo;
      this.anoFab=anoFab ||Sin_anoFab;
      this.velMax =velMax;

    }


    toString() {
        return `Modelo: ${this.modelo}, Año: ${this.anoFab}, velocidad: ${this.velMax}`;
    }

    

  }