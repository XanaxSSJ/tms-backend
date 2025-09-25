import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const TurnoModel = sequelize.define("Turno", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pendiente"
    },
    conductor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vehiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transportista_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "turnos",
    timestamps: true
});
