import express from "express"
import protectRoute from "../middlewares/protectRoute.js";
import { getUserForSidebar } from "../contollers/user.controller.js";

const router = express.Router();

router.get("/",protectRoute,getUserForSidebar);

export default router;