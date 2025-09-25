import { CheckInOutModel } from "../models/checkInOutModel.js";
import { CheckInOutDTO } from "../dto/checkInOutDTO.js";

export class CheckInOutService {
    static async getAll() {
        const data = await CheckInOutModel.findAll();
        return data.map(c => new CheckInOutDTO(c));
    }

    static async getByTurnoId(turno_id) {
        const c = await CheckInOutModel.findOne({ where: { turno_id } });
        return c ? new CheckInOutDTO(c) : null;
    }

    static async checkIn(turno_id) {
        let registro = await CheckInOutModel.findOne({ where: { turno_id } });
        if (!registro) {
            registro = await CheckInOutModel.create({ turno_id, hora_entrada: new Date() });
        } else {
            registro.hora_entrada = new Date();
            await registro.save();
        }
        return new CheckInOutDTO(registro);
    }

    static async checkOut(turno_id) {
        const registro = await CheckInOutModel.findOne({ where: { turno_id } });
        if (!registro) throw new Error("Registro de check-in no encontrado");
        registro.hora_salida = new Date();
        await registro.save();
        return new CheckInOutDTO(registro);
    }

    static async delete(turno_id) {
        const registro = await CheckInOutModel.findOne({ where: { turno_id } });
        if (!registro) return null;
        await registro.destroy();
        return true;
    }
}
