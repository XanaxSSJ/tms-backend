import { KPIService } from "../services/kpiService.js";
import ExcelJS from "exceljs";

export class KPIController {
    // 1. Tiempo de espera promedio
    static async tiempoEsperaPromedio(req, res) {
        try {
            const data = await KPIService.tiempoEsperaPromedio();
            res.json({
                success: true,
                data: data
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: error.message 
            });
        }
    }

    // 2. Viajes por camión al día
    static async viajesPorCamionAlDia(req, res) {
        try {
            const data = await KPIService.viajesPorCamionAlDia();
            res.json({
                success: true,
                data: data
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: error.message 
            });
        }
    }

    // 3. Costo por tonelada transportada
    static async costoPorToneladaTransportada(req, res) {
        try {
            const data = await KPIService.costoPorToneladaTransportada();
            res.json({
                success: true,
                data: data
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: error.message 
            });
        }
    }

    // 4. Cumplimiento de turnos
    static async cumplimientoTurnos(req, res) {
        try {
            const data = await KPIService.cumplimientoTurnos();
            res.json({
                success: true,
                data: data
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: error.message 
            });
        }
    }

    // 5. Obtener todos los KPIs
    static async obtenerTodosLosKPIs(req, res) {
        try {
            const data = await KPIService.obtenerTodosLosKPIs();
            res.json({
                success: true,
                data: data
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: error.message 
            });
        }
    }

    // 6. Exportar todos los KPIs a Excel
    static async exportToExcel(req, res) {
        try {
            const kpis = await KPIService.obtenerTodosLosKPIs();
            const data = kpis;

            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet("Reporte KPI TMS");

            // Configurar estilos
            const headerStyle = {
                font: { bold: true, size: 14 },
                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } },
                alignment: { horizontal: 'center' }
            };

            const subHeaderStyle = {
                font: { bold: true, size: 12 },
                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E2F3' } }
            };

            // Título principal
            sheet.addRow(["REPORTE DE KPIs - SISTEMA TMS"]);
            sheet.getRow(1).font = { bold: true, size: 16 };
            sheet.getRow(1).alignment = { horizontal: 'center' };
            sheet.addRow([`Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`]);
            sheet.addRow([]);

            // 1. Tiempo de espera promedio
            sheet.addRow(["1. TIEMPO DE ESPERA PROMEDIO"]);
            sheet.getRow(sheet.lastRow.number).font = subHeaderStyle.font;
            if (data.tiempoEsperaPromedio) {
                sheet.addRow([`Promedio: ${data.tiempoEsperaPromedio.promedioHoras} horas`]);
                sheet.addRow([`Total registros: ${data.tiempoEsperaPromedio.totalRegistros}`]);
                sheet.addRow([data.tiempoEsperaPromedio.mensaje]);
            } else {
                sheet.addRow(["No hay datos disponibles"]);
            }
            sheet.addRow([]);

            // 2. Viajes por camión al día
            sheet.addRow(["2. VIAJES POR CAMIÓN AL DÍA"]);
            sheet.getRow(sheet.lastRow.number).font = subHeaderStyle.font;
            sheet.addRow(["Vehículo ID", "Placa", "Tipo", "Capacidad", "Fecha", "Total Viajes"]);
            sheet.getRow(sheet.lastRow.number).font = { bold: true };
            
            if (data.viajesPorCamionAlDia && data.viajesPorCamionAlDia.viajes) {
                data.viajesPorCamionAlDia.viajes.forEach(viaje => {
                    sheet.addRow([
                        viaje.vehiculo_id,
                        viaje.placa,
                        viaje.tipo,
                        viaje.capacidad,
                        viaje.fecha,
                        viaje.total_viajes
                    ]);
                });
                sheet.addRow([`Total registros: ${data.viajesPorCamionAlDia.totalRegistros}`]);
            } else {
                sheet.addRow(["No hay datos disponibles"]);
            }
            sheet.addRow([]);

            // 3. Costo por tonelada transportada
            sheet.addRow(["3. COSTO POR TONELADA TRANSPORTADA"]);
            sheet.getRow(sheet.lastRow.number).font = subHeaderStyle.font;
            if (data.costoPorToneladaTransportada) {
                sheet.addRow([`Costo por tonelada: $${data.costoPorToneladaTransportada.costoPorTonelada}`]);
                sheet.addRow([`Total toneladas: ${data.costoPorToneladaTransportada.totalToneladas}`]);
                sheet.addRow([`Total turnos: ${data.costoPorToneladaTransportada.totalTurnos}`]);
                sheet.addRow([`Costo total: $${data.costoPorToneladaTransportada.costoTotal}`]);
                sheet.addRow([data.costoPorToneladaTransportada.mensaje]);
            } else {
                sheet.addRow(["No hay datos disponibles"]);
            }
            sheet.addRow([]);

            // 4. Cumplimiento de turnos
            sheet.addRow(["4. CUMPLIMIENTO DE TURNOS"]);
            sheet.getRow(sheet.lastRow.number).font = subHeaderStyle.font;
            if (data.cumplimientoTurnos) {
                sheet.addRow([`Porcentaje de cumplimiento: ${data.cumplimientoTurnos.porcentajeCumplimiento}%`]);
                sheet.addRow([`Total turnos: ${data.cumplimientoTurnos.totalTurnos}`]);
                sheet.addRow([`Turnos completados: ${data.cumplimientoTurnos.turnosCompletados}`]);
                sheet.addRow([`Turnos con check-in/out: ${data.cumplimientoTurnos.turnosConCheckInOut}`]);
                sheet.addRow([data.cumplimientoTurnos.mensaje]);
            } else {
                sheet.addRow(["No hay datos disponibles"]);
            }

            // Ajustar ancho de columnas
            sheet.columns = [
                { width: 15 },
                { width: 20 },
                { width: 15 },
                { width: 15 },
                { width: 15 },
                { width: 15 }
            ];

            // Configurar headers para descarga
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                `attachment; filename=kpi_report_${new Date().toISOString().split('T')[0]}.xlsx`
            );

            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: error.message 
            });
        }
    }
}