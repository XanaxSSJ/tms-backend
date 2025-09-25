import { Router } from "express";
import { ConductorController } from "../controllers/conductorController.js";

const router = Router();

router.get("/", ConductorController.getAll);
router.post("/", ConductorController.create);
router.get("/:id", ConductorController.getById);
router.put("/:id", ConductorController.update);
router.delete("/:id", ConductorController.delete);

export default router;
