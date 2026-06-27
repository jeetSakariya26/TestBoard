import express from "express";
import { LoginToAdminPage, LogoutToAdminPage, AddQuestionToBank, AddPracticeTestToAll, sendAllQuestionInBank, ChangeDetailsOfQuestion, DeleteQuestionFromID, SignUpForAdmin, AddCSVQuestionToBank } from "../controllers/Admin.js";
import { upload } from "../middleware/multer.js";

const AdminRoute = express.Router();


AdminRoute.post("/signup",SignUpForAdmin);
AdminRoute.post("/login",LoginToAdminPage);
AdminRoute.get("/logout",LogoutToAdminPage);

AdminRoute.post("/AddQuestion/Question",AddQuestionToBank);
AdminRoute.post("/AddQuestion/CSV",upload.any(),AddCSVQuestionToBank);
AdminRoute.post("/AddPracticeTest",AddPracticeTestToAll);

AdminRoute.get("/ViewQuestion",sendAllQuestionInBank);
AdminRoute.post("/Question/Update/:QuestionID",ChangeDetailsOfQuestion);


AdminRoute.post("/DeleteQuestion/:QuestionID",DeleteQuestionFromID);



export default AdminRoute;