import { Router } from "express";
import { isAuthenticated } from "../../auth/auth.services";
import { handleCreateLibrary } from "./library.controller";

const router = Router();

// POST api/libraries -- create a new library --
router.post("/", isAuthenticated, handleCreateLibrary);

export default router;