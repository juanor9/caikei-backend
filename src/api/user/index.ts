import { Router } from "express";
import {
    handleCreateUser,
    handleGetUser,
    handleUpdateUser,
} from "./user.controller";
import { isAuthenticated } from "../../auth/auth.services";

const router = Router();

// POST api/user/   ---Create user ---
router.post("/", handleCreateUser);

// GET api/user/    ---Get user ---
router.get("/", isAuthenticated, handleGetUser);

//PATCH api/user/ ---Update user ---
router.patch("/:id", isAuthenticated, handleUpdateUser);

export default router;