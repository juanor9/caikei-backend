import { Router } from "express";
import { isAuthenticated } from "../../auth/auth.services";
import { handleCreateBook } from "./book.controller";

const router = Router();

// POST api/books -- create a new book --
router.post("/", isAuthenticated, handleCreateBook);

export default router;