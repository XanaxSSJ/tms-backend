import { TurnoService } from "../services/turnoService.js";

export class TurnoController {
    static async getAll(req, res) {
        try {
            const turnos = await TurnoService.getAll();
            res.json(turnos);
        } catch (err) {
            res.status(500).json({ message: "Error al obtener turnos", error: err.message });
        }
    }

    static async getById(req, res) {
        try {
            const turno = await TurnoService.getById(req.params.id);
            if (!turno) return res.status(404).json({ message: "Turno no encontrado" });
            res.json(turno);
        } catch (err) {
            res.status(500).json({ message: "Error al obtener turno", error: err.message });
        }
    }

    static async create(req, res) {
        try {
            const nuevoTurno = await TurnoService.create(req.body);
            res.status(201).json(nuevoTurno);
        } catch (err) {
            res.status(500).json({ message: "Error al crear turno", error: err.message });
        }
    }

    static async update(req, res) {
        try {
            const turnoActualizado = await TurnoService.update(req.params.id, req.body);
            if (!turnoActualizado) return res.status(404).json({ message: "Turno no encontrado" });
            res.json(turnoActualizado);
        } catch (err) {
            res.status(500).json({ message: "Error al actualizar turno", error: err.message });
        }
    }

    static async delete(req, res) {
        try {
            const eliminado = await TurnoService.delete(req.params.id);
            if (!eliminado) return res.status(404).json({ message: "Turno no encontrado" });
            res.json({ message: "Turno eliminado correctamente" });
        } catch (err) {
            res.status(500).json({ message: "Error al eliminar turno", error: err.message });
        }
    }
}
