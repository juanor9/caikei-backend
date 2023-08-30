import { Router } from "express";
import { handleGetPlanById } from "./plans.controller";
import { isAuthenticated } from "../../auth/auth.services";

const router = Router();

// GET api/publishers/:id -- consult a publisher --
router.get("/:id", isAuthenticated, handleGetPlanById);

export default router;