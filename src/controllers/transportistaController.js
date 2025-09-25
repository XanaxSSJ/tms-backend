import { TransportistaService } from "../services/transportistaService.js";

export class TransportistaController {
    static async getAll(req, res) {
        const data = await TransportistaService.getAll();
        res.json(data);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const t = await TransportistaService.getById(id);
        if (!t) return res.status(404).json({ message: "TransportistaModel no encontrado" });
        res.json(t);
    }

    static async create(req, res) {
        try {
            const t = await TransportistaService.create(req.body);
            res.status(201).json(t);
        } catch (error) {
            res.status(400).json({ message: "Error al crear transportista", error: error.message });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const t = await TransportistaService.update(id, req.body);
        if (!t) return res.status(404).json({ message: "TransportistaModel no encontrado" });
        res.json(t);
    }

    static async delete(req, res) {
        const { id } = req.params;
        const ok = await TransportistaService.delete(id);
        if (!ok) return res.status(404).json({ message: "TransportistaModel no encontrado" });
        res.json({ message: "TransportistaModel eliminado" });
    }
}
