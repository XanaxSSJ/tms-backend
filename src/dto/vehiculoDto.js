export class VehiculoDTO {
    constructor({ id, placa, tipo, capacidad, transportista_id }) {
        this.id = id;
        this.placa = placa;
        this.tipo = tipo;
        this.capacidad = capacidad;
        this.transportista_id = transportista_id;
    }
}
