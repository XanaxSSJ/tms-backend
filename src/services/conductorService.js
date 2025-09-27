import { ConductorModel } from "../models/conductorModel.js";
import { ConductorDTO } from "../dto/conductorDto.js";

export class ConductorService {
    static async getAll() {
        const data = await ConductorModel.findAll();
        return data.map(c => new ConductorDTO(c));
    }

    static async getById(id) {
        const c = await ConductorModel.findByPk(id);
        return c ? new ConductorDTO(c) : null;
    }

    static async create(payload) {
        const c = await ConductorModel.create(payload);
        return new ConductorDTO(c);
    }

    static async update(id, payload) {
        const c = await ConductorModel.findByPk(id);
        if (!c) return null;
        await c.update(payload);
        return new ConductorDTO(c);
    }

    static async delete(id) {
        const c = await ConductorModel.findByPk(id);
        if (!c) return null;
        await c.destroy();
        return true;
    }

    static validarLicencia(c) {
        if (!c.licencia || c.licencia.trim().length < 6) return false;
        if (!c.fecha_vencimiento_licencia) return false;
        
        const hoy = new Date();
        const fechaVencimiento = new Date(c.fecha_vencimiento_licencia);
        
        // Normalizar fechas a medianoche para comparación solo por fecha (sin hora)
        const hoyNormalizado = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        const vencimientoNormalizado = new Date(fechaVencimiento.getFullYear(), fechaVencimiento.getMonth(), fechaVencimiento.getDate());
        
        // La licencia es válida si la fecha de vencimiento es mayor o igual a hoy
        return vencimientoNormalizado >= hoyNormalizado;
    }
}
