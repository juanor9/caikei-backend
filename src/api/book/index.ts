import { Router } from "express";
import { isAuthenticated } from "../../auth/auth.services";
import {
  handleCreateBook,
  handleGetBooksByFilter,
  handleUpdateBook,
  handleGetBookById,
} from "./book.controller";

const router = Router();

// POST api/books -- create a new book --
router.post("/", isAuthenticated, handleCreateBook);

// GET api/books/search? -- search books --
router.get("/search", isAuthenticated, handleGetBooksByFilter);

// GET api/books/:id -- retrieve a specific book --
router.get("/:id", isAuthenticated, handleGetBookById);

//PATCH api/books/:id -- update a specific book --
router.patch("/:id", isAuthenticated, handleUpdateBook);

export default router;
