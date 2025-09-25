import { ConductorDTO } from "./conductorDto.js";
import { TransportistaDTO } from "./transportistaDto.js";

export class TurnoDTO {
    constructor({ id, fecha, hora, estado, conductor_id, vehiculo_id, transportista_id, observaciones, conductor, transportista }) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
        this.conductor_id = conductor_id;
        this.vehiculo_id = vehiculo_id;
        this.transportista_id = transportista_id;
        this.observaciones = observaciones;
        
        // Incluir objetos relacionados si están presentes
        this.conductor = conductor ? new ConductorDTO(conductor) : null;
        this.transportista = transportista ? new TransportistaDTO(transportista) : null;
    }
}
