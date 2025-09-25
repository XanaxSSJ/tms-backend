export class CheckInOutDTO {
    constructor({ id, turno_id, hora_entrada, hora_salida }) {
        this.id = id;
        this.turno_id = turno_id;
        this.hora_entrada = hora_entrada;
        this.hora_salida = hora_salida;
    }
}
