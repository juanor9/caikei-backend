import { Router } from "express";
import { isAuthenticated } from "../../auth/auth.services";
import { handleCreateBook, handleGetBooksByFilter } from "./book.controller";

const router = Router();

// POST api/books -- create a new book --
router.post("/", isAuthenticated, handleCreateBook);

// GET api/books/search -- search books --
router.get("/search", isAuthenticated, handleGetBooksByFilter);

export default router;