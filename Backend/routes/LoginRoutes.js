import express from "express";
import { AuthenticationForTeacher, AuthenticationForStudent } from "../controllers/auth.js";


const LoginRoute = express.Router();

// login for teacher
LoginRoute.post("/Teacher", AuthenticationForTeacher);


// login for student
LoginRoute.post("/Student", AuthenticationForStudent);


export default LoginRoute;

