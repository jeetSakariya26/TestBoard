import express from "express";
import { AddTeacher, AddStudent } from "../controllers/AddUser.js";

const SignUpRoute = express.Router();

// signup for teacher 
SignUpRoute.post("/Teacher", AddTeacher);


// signup for student
SignUpRoute.post("/Student", AddStudent);


export default SignUpRoute;