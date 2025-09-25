import { VehiculoService } from "../services/vehiculoService.js";

export class VehiculoController {
    static async getAll(req, res) {
        try {
            const vehiculos = await VehiculoService.getAll();
            res.json(vehiculos);
        } catch (error) {
            res.status(500).json({ message: "Error al listar vehículos", error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const vehiculo = await VehiculoService.getById(req.params.id);
            if (!vehiculo) return res.status(404).json({ message: "Vehículo no encontrado" });
            res.json(vehiculo);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener vehículo", error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const vehiculo = await VehiculoService.create(req.body);
            res.status(201).json(vehiculo);
        } catch (error) {
            res.status(500).json({ message: "Error al crear vehículo", error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const vehiculo = await VehiculoService.update(req.params.id, req.body);
            if (!vehiculo) return res.status(404).json({ message: "Vehículo no encontrado" });
            res.json(vehiculo);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar vehículo", error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const deleted = await VehiculoService.delete(req.params.id);
            if (!deleted) return res.status(404).json({ message: "Vehículo no encontrado" });
            res.json({ message: "Vehículo eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar vehículo", error: error.message });
        }
    }
}
