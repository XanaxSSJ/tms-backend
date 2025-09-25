import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const TransportistaModel = sequelize.define("Transportista", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ruc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "transportistas",
    timestamps: true
});
