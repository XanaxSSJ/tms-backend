import { ConductorService } from "../services/conductorService.js";

export const ConductorController = {
    async getAll(req, res) {
        try {
            const conductores = await ConductorService.getAll(); // ✅
            res.json(conductores);
        } catch (error) {
            res.status(500).json({ message: "Error al listar conductores", error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const conductor = await ConductorService.getById(req.params.id); // ✅
            if (!conductor) {
                return res.status(404).json({ message: "Conductor no encontrado" });
            }
            res.json(conductor);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener conductor", error: error.message });
        }
    },

    async create(req, res) {
        try {
            const conductor = await ConductorService.create(req.body); // ✅
            res.status(201).json(conductor);
        } catch (error) {
            res.status(500).json({ message: "Error al crear conductor", error: error.message });
        }
    },

    async update(req, res) {
        try {
            const conductor = await ConductorService.update(req.params.id, req.body); // ✅
            if (!conductor) {
                return res.status(404).json({ message: "Conductor no encontrado" });
            }
            res.json(conductor);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar conductor", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await ConductorService.delete(req.params.id); // ✅
            if (!result) {
                return res.status(404).json({ message: "Conductor no encontrado" });
            }
            res.json({ message: "Conductor eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar conductor", error: error.message });
        }
    }
};
