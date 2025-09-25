import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const VehiculoModel = sequelize.define("Vehiculo", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacidad: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    transportista_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "vehiculos",
    timestamps: true
});
