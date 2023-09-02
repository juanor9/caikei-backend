import { Router } from "express";
import { handleGetPlanById, handleGetPlanAll } from "./plans.controller";
import { isAuthenticated } from "../../auth/auth.services";

const router = Router();
// GET api/publishers/ -- consult all plans --
router.get("/", isAuthenticated, handleGetPlanAll);
// GET api/publishers/:id -- consult a plan --
router.get("/:id", isAuthenticated, handleGetPlanById);

export default router;