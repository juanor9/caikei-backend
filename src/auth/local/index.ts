import { Router } from 'express';
import { handleLogin } from "./local.controller";

  const router = Router();

  //Login
  // auth/local/login
  router.post("/login", handleLogin);

  export default router;