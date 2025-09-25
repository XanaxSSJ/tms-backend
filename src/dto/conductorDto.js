export class ConductorDTO {
    constructor({ id, nombre, licencia, fecha_vencimiento_licencia, telefono, transportista_id }) {
        this.id = id;
        this.nombre = nombre;
        this.licencia = licencia;
        this.fecha_vencimiento_licencia = fecha_vencimiento_licencia;
        this.telefono = telefono;
        this.transportista_id = transportista_id;
    }
}
