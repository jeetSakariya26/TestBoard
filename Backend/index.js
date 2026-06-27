import express from "express";
import "dotenv/config";
import connectDataBase from "./utils/database.js";
import LoginRoute from "./routes/LoginRoutes.js";
import SignUpRoute from "./routes/SignUpRoutes.js";
import LogoutRoute from "./routes/LogoutRoute.js";
import AdminRoute from "./routes/AdminRoutes.js";
import TeacherRoute from "./routes/TeacherRoute.js";
import StudentRoute from "./routes/StudentRoutes.js";
import { TokenParse } from "./middleware/TokenParse.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;
console.log(PORT);

app.use(express.json());
app.use(cookieParser());


// connecting database 
connectDataBase();

// login and signup routes
app.use("/login",LoginRoute);
app.use("/signup",SignUpRoute);
app.use("/logout",LogoutRoute);

// rotues for admin,teacher and student
app.use("/Admin",TokenParse,AdminRoute);
app.use("/Teacher",TokenParse,TeacherRoute);
app.use("/Student",TokenParse,StudentRoute);



app.listen(PORT,() =>{
    console.log("server starts on port :", PORT);
});