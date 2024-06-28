import { Router } from "express";
import * as authController from "../controller/auth.controller.js"
import { generateMiddleWare } from "../middleware/route.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";

const authRouter = Router();

authRouter.post("/Login", generateMiddleWare(loginSchema), authController.login)
authRouter.post("/register",generateMiddleWare(registerSchema), authController.register)


export default authRouter;