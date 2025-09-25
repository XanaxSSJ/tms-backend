import { Router } from "express";
import { TurnoController } from "../controllers/turnoController.js";

const router = Router();

router.get("/", TurnoController.getAll);
router.post("/", TurnoController.create);
router.get("/:id", TurnoController.getById);
router.put("/:id", TurnoController.update);
router.delete("/:id", TurnoController.delete);

export default router;
