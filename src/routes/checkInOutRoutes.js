import { Router } from "express";
import { CheckInOutController } from "../controllers/checkInOutController.js";

const router = Router();

router.get("/", CheckInOutController.getAll);
router.get("/:turno_id", CheckInOutController.getByTurnoId);
router.post("/checkin", CheckInOutController.checkIn);
router.post("/checkout", CheckInOutController.checkOut);
router.delete("/:turno_id", CheckInOutController.delete);

export default router;
