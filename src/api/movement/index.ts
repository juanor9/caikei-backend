import { Router } from "express";
import { isAuthenticated } from "../../auth/auth.services";
import { HandleCreateMovement, HandleGetMovementsByPublisher } from "./movement.controller";

const router = Router();

// POST api/movements -- create a new movement --
router.post("/", isAuthenticated, HandleCreateMovement);

// GET api/movements -- get movements from certain publishers --
router.get("/", isAuthenticated, HandleGetMovementsByPublisher);

export default router;