import express from "express";
import { LogoutForUser } from "../controllers/auth.js";

const LogoutRoute = express.Router();

LogoutRoute.get("/", LogoutForUser);

export default LogoutRoute;