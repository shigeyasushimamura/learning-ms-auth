import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controllers/authController";

export const AuthRouter = (authController: AuthController): Router => {
  const router = Router();

  router.post("/", (req: Request, res: Response, next: NextFunction) => {
    authController.getAuthorizeUri(req, res).catch(next);
  });

  return router;
};
