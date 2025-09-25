import { TurnoModel } from "../models/turnoModel.js";
import { TurnoDTO } from "../dto/turnoDto.js";
import { ConductorModel } from "../models/conductorModel.js";
import { TransportistaModel } from "../models/transportistaModel.js";

export class TurnoService {
    static async getAll() {
        const data = await TurnoModel.findAll({
            include: [
                { model: ConductorModel, as: "conductor" },
                { model: TransportistaModel, as: "transportista" }
            ]
        });
        return data.map(t => new TurnoDTO(t));
    }

    static async getById(id) {
        const t = await TurnoModel.findByPk(id, {
            include: [
                { model: ConductorModel, as: "conductor" },
                { model: TransportistaModel, as: "transportista" }
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
