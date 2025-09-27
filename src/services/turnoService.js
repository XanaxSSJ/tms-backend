import { TurnoModel } from "../models/turnoModel.js";
import { TurnoDTO } from "../dto/turnoDto.js";
import { ConductorModel } from "../models/conductorModel.js";
import { TransportistaModel } from "../models/transportistaModel.js";
import { VehiculoModel } from "../models/vehiculoModel.js";

export class TurnoService {
    static async getAll() {
        const data = await TurnoModel.findAll({
            include: [
                { model: ConductorModel, as: "conductor", attributes: ["nombre"] },
                { model: VehiculoModel, as: "vehiculo", attributes: ["placa"] },
                { model: TransportistaModel, as: "transportista", attributes: ["nombre"] }
            ]
        });
        return data.map(t => new TurnoDTO(t));
    }

    static async getById(id) {
        const t = await TurnoModel.findByPk(id, {
            include: [
                { model: ConductorModel, as: "conductor", attributes: ["nombre"] },
                { model: VehiculoModel, as: "vehiculo", attributes: ["placa"] },
                { model: TransportistaModel, as: "transportista", attributes: ["nombre"] }
            ]
        });
        return t ? new TurnoDTO(t) : null;
    }

    static async create(payload) {
        const t = await TurnoModel.create(payload);
        return new TurnoDTO(t);
    }

    static async update(id, payload) {
        const t = await TurnoModel.findByPk(id);
        if (!t) return null;
        await t.update(payload);
        return new TurnoDTO(t);
    }

    static async delete(id) {
        const t = await TurnoModel.findByPk(id);
        if (!t) return null;
        await t.destroy();
        return true;
    }
}
