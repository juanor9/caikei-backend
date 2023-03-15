import { Router } from "express";
import { isAuthenticated } from "../../auth/auth.services";
import {
  handleCreateLibrary,
  handleUpdateLibrary,
  handleGetLibrariesByFilter,
  handleGetLibraryById,
} from "./library.controller";

const router = Router();

// POST api/libraries -- create a new library --
router.post("/", isAuthenticated, handleCreateLibrary);

// PATCH api/libraries -- update a library --
router.patch("/:id", isAuthenticated, handleUpdateLibrary);

// GET api/libraries/search? -- search books --
router.get("/search", isAuthenticated, handleGetLibrariesByFilter);

// GET api/libraries/:id -- retrieve library by id --
router.get("/:id", isAuthenticated, handleGetLibraryById);

export default router;
