import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ConductorModel = sequelize.define("Conductor", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    licencia: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fecha_vencimiento_licencia: {      
        type: DataTypes.DATE,
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    transportista_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "transportistas",
            key: "id"
        }
    }
}, {
    tableName: "conductores",
    timestamps: true
});
