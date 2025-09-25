import { VehiculoModel } from "../models/vehiculoModel.js";
import { VehiculoDTO } from "../dto/vehiculoDto.js";

export class VehiculoService {
    static async getAll() {
        const data = await VehiculoModel.findAll();
        return data.map(v => new VehiculoDTO(v));
    }

    static async getById(id) {
        const v = await VehiculoModel.findByPk(id);
        return v ? new VehiculoDTO(v) : null;
    }

    static async create(payload) {
        const v = await VehiculoModel.create(payload);
        return new VehiculoDTO(v);
    }

    static async update(id, payload) {
        const v = await VehiculoModel.findByPk(id);
        if (!v) return null;
        await v.update(payload);
        return new VehiculoDTO(v);
    }

    static async delete(id) {
        const v = await VehiculoModel.findByPk(id);
        if (!v) return null;
        await v.destroy();
        return true;
    }
}
