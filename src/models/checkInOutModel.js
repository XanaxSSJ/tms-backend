import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { TurnoModel } from "./turnoModel.js";

export const CheckInOutModel = sequelize.define("CheckInOut", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    turno_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TurnoModel,
            key: "id"
        }
    },
    hora_entrada: {
        type: DataTypes.DATE,
        allowNull: true
    },
    hora_salida: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: "checkinout",
    timestamps: true
});
