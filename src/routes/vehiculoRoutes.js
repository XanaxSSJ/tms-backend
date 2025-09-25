import { Router } from "express";
import { VehiculoController } from "../controllers/vehiculoController.js";

const router = Router();

router.get("/", VehiculoController.getAll);
router.post("/", VehiculoController.create);
router.get("/:id", VehiculoController.getById);
router.put("/:id", VehiculoController.update);
router.delete("/:id", VehiculoController.delete);

export default router;
