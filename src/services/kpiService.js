import { CheckInOutModel } from "../models/checkInOutModel.js";
import { TurnoModel } from "../models/turnoModel.js";
import { VehiculoModel } from "../models/vehiculoModel.js";
import { Sequelize } from "sequelize";

export class KPIService {
    // 1. Tiempo de espera promedio (diferencia entre hora_salida y hora_entrada)
    static async tiempoEsperaPromedio() {
        try {
            const registros = await CheckInOutModel.findAll({
                where: {
                    hora_entrada: { [Sequelize.Op.ne]: null },
                    hora_salida: { [Sequelize.Op.ne]: null }
                },
                attributes: ['hora_entrada', 'hora_salida']
            });

            if (registros.length === 0) {
                return { 
                    promedioHoras: 0,
                    totalRegistros: 0,
                    mensaje: "No hay registros de check-in/check-out completos"
                };
            }

            const totalHoras = registros.reduce((sum, registro) => {
                const entrada = new Date(registro.hora_entrada);
                const salida = new Date(registro.hora_salida);
                const horas = (salida - entrada) / (1000 * 60 * 60); // Convertir a horas
                return sum + horas;
            }, 0);

            const promedioHoras = totalHoras / registros.length;

            return {
                promedioHoras: parseFloat(promedioHoras.toFixed(2)),
                totalRegistros: registros.length,
                mensaje: `Tiempo promedio de espera calculado sobre ${registros.length} registros`
            };
        } catch (error) {
            throw new Error(`Error calculando tiempo de espera promedio: ${error.message}`);
        }
    }

    // 2. Viajes por camión al día
    static async viajesPorCamionAlDia() {
        try {
            // Primero obtenemos los datos agrupados sin el include
            const viajesAgrupados = await TurnoModel.findAll({
                attributes: [
                    'vehiculo_id',
                    [Sequelize.fn('DATE', Sequelize.col('fecha')), 'fecha'],
                    [Sequelize.fn('COUNT', Sequelize.col('id')), 'total_viajes']
                ],
                group: ['vehiculo_id', Sequelize.fn('DATE', Sequelize.col('fecha'))],
                order: [
                    [Sequelize.fn('DATE', Sequelize.col('fecha')), 'DESC'],
                    ['vehiculo_id', 'ASC']
                ],
                raw: true
            });

            // Luego obtenemos la información de los vehículos
            const vehiculosIds = [...new Set(viajesAgrupados.map(v => v.vehiculo_id))];
            const vehiculos = await VehiculoModel.findAll({
                where: {
                    id: vehiculosIds
                },
                attributes: ['id', 'placa', 'tipo', 'capacidad'],
                raw: true
            });

            // Creamos un mapa de vehículos para acceso rápido
            const vehiculosMap = {};
            vehiculos.forEach(v => {
                vehiculosMap[v.id] = v;
            });

            // Combinamos los datos
            const resultado = viajesAgrupados.map(viaje => {
                const vehiculo = vehiculosMap[viaje.vehiculo_id];
                return {
                    vehiculo_id: viaje.vehiculo_id,
                    placa: vehiculo ? vehiculo.placa : 'N/A',
                    tipo: vehiculo ? vehiculo.tipo : 'N/A',
                    capacidad: vehiculo ? vehiculo.capacidad : 0,
                    fecha: viaje.fecha,
                    total_viajes: parseInt(viaje.total_viajes)
                };
            });

            return {
                viajes: resultado,
                totalRegistros: resultado.length,
                mensaje: `Se encontraron ${resultado.length} registros de viajes por camión al día`
            };
        } catch (error) {
            throw new Error(`Error calculando viajes por camión al día: ${error.message}`);
        }
    }

    // 3. Costo por tonelada transportada
    static async costoPorToneladaTransportada() {
        try {
            // Para este KPI necesitamos asumir algunos datos o agregar campos al modelo
            // Por ahora calcularemos basado en la capacidad de los vehículos y turnos completados
            
            const turnosCompletados = await TurnoModel.findAll({
                where: {
                    estado: 'completado'
                },
                include: [{
                    model: VehiculoModel,
                    as: 'vehiculo',
                    attributes: ['capacidad', 'tipo']
                }]
            });

            if (turnosCompletados.length === 0) {
                return {
                    costoPorTonelada: 0,
                    totalToneladas: 0,
                    totalTurnos: 0,
                    mensaje: "No hay turnos completados para calcular el costo por tonelada"
                };
            }

            // Calcular toneladas totales transportadas
            const totalToneladas = turnosCompletados.reduce((sum, turno) => {
                return sum + turno.vehiculo.capacidad;
            }, 0);

            // Asumir un costo fijo por turno (esto debería venir de una tabla de costos)
            const costoPorTurno = 150; // Costo estimado por turno
            const costoTotal = turnosCompletados.length * costoPorTurno;
            const costoPorTonelada = totalToneladas > 0 ? costoTotal / totalToneladas : 0;

            return {
                costoPorTonelada: parseFloat(costoPorTonelada.toFixed(2)),
                totalToneladas: parseFloat(totalToneladas.toFixed(2)),
                totalTurnos: turnosCompletados.length,
                costoTotal: costoTotal,
                mensaje: `Costo calculado sobre ${turnosCompletados.length} turnos completados`
            };
        } catch (error) {
            throw new Error(`Error calculando costo por tonelada: ${error.message}`);
        }
    }

    // 4. Cumplimiento de turnos
    static async cumplimientoTurnos() {
        try {
            const totalTurnos = await TurnoModel.count();
            
            const turnosCompletados = await TurnoModel.count({
                where: {
                    estado: 'completado'
                }
            });

            const turnosConCheckInOut = await CheckInOutModel.count({
                where: {
                    hora_entrada: { [Sequelize.Op.ne]: null },
                    hora_salida: { [Sequelize.Op.ne]: null }
                }
            });

            if (totalTurnos === 0) {
                return {
                    porcentajeCumplimiento: 0,
                    totalTurnos: 0,
                    turnosCompletados: 0,
                    turnosConCheckInOut: 0,
                    mensaje: "No hay turnos registrados"
                };
            }

            // Calcular cumplimiento basado en turnos con check-in/check-out completos
            const porcentajeCumplimiento = (turnosConCheckInOut / totalTurnos) * 100;

            return {
                porcentajeCumplimiento: parseFloat(porcentajeCumplimiento.toFixed(2)),
                totalTurnos: totalTurnos,
                turnosCompletados: turnosCompletados,
                turnosConCheckInOut: turnosConCheckInOut,
                mensaje: `${turnosConCheckInOut} de ${totalTurnos} turnos tienen check-in/check-out completos`
            };
        } catch (error) {
            throw new Error(`Error calculando cumplimiento de turnos: ${error.message}`);
        }
    }

    // Método para obtener todos los KPIs en una sola consulta
    static async obtenerTodosLosKPIs() {
        try {
            const [
                tiempoEspera,
                viajesPorCamion,
                costoPorTonelada,
                cumplimiento
            ] = await Promise.all([
                this.tiempoEsperaPromedio(),
                this.viajesPorCamionAlDia(),
                this.costoPorToneladaTransportada(),
                this.cumplimientoTurnos()
            ]);

            return {
                tiempoEsperaPromedio: tiempoEspera,
                viajesPorCamionAlDia: viajesPorCamion,
                costoPorToneladaTransportada: costoPorTonelada,
                cumplimientoTurnos: cumplimiento,
                fechaGeneracion: new Date().toISOString(),
                mensaje: "Todos los KPIs generados exitosamente"
            };
        } catch (error) {
            throw new Error(`Error generando KPIs: ${error.message}`);
        }
    }
}