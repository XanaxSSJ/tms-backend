import { TransportistaModel } from "../models/transportistaModel.js";
import { TransportistaDTO } from "../dto/transportistaDto.js";

export class TransportistaService {
    static async getAll() {
        const data = await TransportistaModel.findAll();
        return data.map(t => new TransportistaDTO(t));
    }

    static async getById(id) {
        const t = await TransportistaModel.findByPk(id);
        return t ? new TransportistaDTO(t) : null;
    }

    static async create(payload) {
        const t = await TransportistaModel.create(payload);
        return new TransportistaDTO(t);
    }

    static async update(id, payload) {
        const t = await TransportistaModel.findByPk(id);
        if (!t) return null;
        await t.update(payload);
        return new TransportistaDTO(t);
    }

    static async delete(id) {
        const t = await TransportistaModel.findByPk(id);
        if (!t) return null;
        await t.destroy();
        return true;
    }

    static validarRUC(transportista) {
        return transportista && transportista.ruc && transportista.ruc.trim().length === 11;
    }
}
