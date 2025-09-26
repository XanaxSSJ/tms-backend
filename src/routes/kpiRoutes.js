import { Router } from "express";
import { KPIController } from "../controllers/kpiController.js";

const router = Router();

// Rutas para KPIs individuales
router.get("/tiempo-espera-promedio", KPIController.tiempoEsperaPromedio);
router.get("/viajes-por-camion-al-dia", KPIController.viajesPorCamionAlDia);
router.get("/costo-por-tonelada", KPIController.costoPorToneladaTransportada);
router.get("/cumplimiento-turnos", KPIController.cumplimientoTurnos);

// Ruta para obtener todos los KPIs
router.get("/todos", KPIController.obtenerTodosLosKPIs);

// Ruta para exportar a Excel
router.get("/export-excel", KPIController.exportToExcel);

export default router;