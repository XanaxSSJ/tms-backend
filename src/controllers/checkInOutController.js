import { CheckInOutService } from "../services/checkInOutService.js";
import { TurnoService } from "../services/turnoService.js";
import { ConductorService } from "../services/conductorService.js";
import { TransportistaService } from "../services/transportistaService.js";
import { TurnoModel } from "../models/turnoModel.js";

export class CheckInOutController {
    static async checkIn(req, res) {
        try {
            const { turno_id } = req.body;
            
            // Obtener el turno directamente del modelo para acceder a los IDs
            const turno = await TurnoModel.findByPk(turno_id);
            if (!turno) return res.status(404).json({ message: "Turno no encontrado" });

            // Obtener los objetos completos del conductor y transportista para validación
            const conductor = await ConductorService.getById(turno.conductor_id);
            const transportista = await TransportistaService.getById(turno.transportista_id);

            if (!conductor) return res.status(404).json({ message: "Conductor no encontrado" });
            if (!transportista) return res.status(404).json({ message: "Transportista no encontrado" });

            if (!ConductorService.validarLicencia(conductor)) {
                return res.status(400).json({ message: "Licencia del conductor inválida o vencida" });
            }

            if (!TransportistaService.validarRUC(transportista)) {
                return res.status(400).json({ message: "RUC del transportista inválido" });
            }

            const checkin = await CheckInOutService.checkIn(turno_id);
            res.json(checkin);

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async checkOut(req, res) {
        try {
            const { turno_id } = req.body;
            const checkout = await CheckInOutService.checkOut(turno_id);
            res.json(checkout);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async getAll(req, res) {
        try {
            const checkInOuts = await CheckInOutService.getAll();
            res.json(checkInOuts);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async getByTurnoId(req, res) {
        try {
            const { turno_id } = req.params;
            const checkInOut = await CheckInOutService.getByTurnoId(turno_id);
            if (!checkInOut) {
                return res.status(404).json({ message: "CheckInOut no encontrado" });
            }
            res.json(checkInOut);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async delete(req, res) {
        try {
            const { turno_id } = req.params;
            await CheckInOutService.delete(turno_id);
            res.json({ message: "CheckInOut eliminado correctamente" });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}
