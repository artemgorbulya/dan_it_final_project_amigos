import {Router} from "express";
import { registerUser, loginUser, verifyUser, refreshToken } from "./controller";
import errorHandler from "../../../errors/routeErrorController";

const route = Router();

export default baseRouter => {
	baseRouter.use("/auth", route);

	route.post("/register", errorHandler(registerUser));
	route.post("/login", errorHandler(loginUser));
	route.post("/verify", errorHandler(verifyUser));
	// route.post("/refreshToken", errorHandler(refreshToken));
}