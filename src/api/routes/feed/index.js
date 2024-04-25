import {Router} from "express";
import errorHandler from "../../../errors/routeErrorController";
import { getFeedList, getFeedMap } from "./controller";

const route = Router();

export default baseRouter => {
	baseRouter.use("/feed", route);

	route.post("/list", errorHandler(getFeedList));
	route.post("/map", errorHandler(getFeedMap));
}