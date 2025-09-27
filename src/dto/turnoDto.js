export class TurnoDTO {
    constructor(model) {
        this.id = model.id;
        this.fecha = model.fecha;
        this.hora = model.hora;
        this.estado = model.estado;
        this.conductor = model.conductor ? model.conductor.nombre : null;
        this.vehiculo = model.vehiculo ? model.vehiculo.placa : null;
        this.transportista = model.transportista ? model.transportista.nombre : null;
        this.observaciones = model.observaciones ?? null;
    }
}
