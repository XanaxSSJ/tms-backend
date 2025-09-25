import { TurnoModel } from "./turnoModel.js";
import { ConductorModel } from "./conductorModel.js";
import { TransportistaModel } from "./transportistaModel.js";
import { VehiculoModel } from "./vehiculoModel.js";

// ========================================
// RELACIONES PRINCIPALES
// ========================================

// 1. TURNO - CONDUCTOR
TurnoModel.belongsTo(ConductorModel, {
    foreignKey: "conductor_id",
    as: "conductor"
});

ConductorModel.hasMany(TurnoModel, {
    foreignKey: "conductor_id",
    as: "turnos"
});

// 2. TURNO - TRANSPORTISTA
TurnoModel.belongsTo(TransportistaModel, {
    foreignKey: "transportista_id",
    as: "transportista"
});

TransportistaModel.hasMany(TurnoModel, {
    foreignKey: "transportista_id",
    as: "turnos"
});

// 3. TURNO - VEHÍCULO
TurnoModel.belongsTo(VehiculoModel, {
    foreignKey: "vehiculo_id",
    as: "vehiculo"
});

VehiculoModel.hasMany(TurnoModel, {
    foreignKey: "vehiculo_id",
    as: "turnos"
});

// ========================================
// RELACIONES SECUNDARIAS
// ========================================

// 4. CONDUCTOR - TRANSPORTISTA
ConductorModel.belongsTo(TransportistaModel, {
    foreignKey: "transportista_id",
    as: "transportista"
});

TransportistaModel.hasMany(ConductorModel, {
    foreignKey: "transportista_id",
    as: "conductores"
});

// 5. VEHÍCULO - TRANSPORTISTA
VehiculoModel.belongsTo(TransportistaModel, {
    foreignKey: "transportista_id",
    as: "transportista"
});

TransportistaModel.hasMany(VehiculoModel, {
    foreignKey: "transportista_id",
    as: "vehiculos"
});
