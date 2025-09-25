export class TurnoDTO {
    constructor({ id, fecha, hora, estado, conductor_id, vehiculo_id, transportista_id, observaciones }) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
        this.conductor_id = conductor_id;
        this.vehiculo_id = vehiculo_id;
        this.transportista_id = transportista_id;
        this.observaciones = observaciones;
    }
}
