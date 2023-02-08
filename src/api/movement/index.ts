import { Router } from "express";
import { isAuthenticated } from "../../auth/auth.services";
import { HandleCreateMovement } from "./movement.controller";

const router = Router();

// POST api/movements -- create a new movement --
router.post("/", isAuthenticated, HandleCreateMovement);

export default router;