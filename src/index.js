import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/database.js";
import "./models/associations.js";
import transportistaRoutes from "./routes/transportistaRoutes.js";
import conductorRoutes from "./routes/conductorRoutes.js";
import vehiculoRoutes from "./routes/vehiculoRoutes.js";
import turnoRoutes from "./routes/turnoRoutes.js";
import checkInOutRoutes from "./routes/checkInOutRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/transportistas", transportistaRoutes);
app.use("/api/conductores", conductorRoutes);
app.use("/api/vehiculos", vehiculoRoutes);
app.use("/api/turnos", turnoRoutes);
app.use("/api/checkinout", checkInOutRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Servidor corriendo con Bun + Express 🚀" });
});

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true }); // crea tablas si no existen
        console.log("✅ Conectado a PostgreSQL");
        app.listen(3000, () => console.log("🚀 Servidor en http://localhost:3000"));
    } catch (error) {
        console.error("❌ Error al iniciar:", error);
    }
})();
