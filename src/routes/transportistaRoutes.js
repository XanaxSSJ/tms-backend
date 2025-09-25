import { Router } from "express";
import { TransportistaController } from "../controllers/transportistaController.js";

const router = Router();

router.get("/", TransportistaController.getAll);
router.post("/", TransportistaController.create);
router.get("/:id", TransportistaController.getById);
router.put("/:id", TransportistaController.update);
router.delete("/:id", TransportistaController.delete);

export default router;
