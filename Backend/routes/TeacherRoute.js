import express from "express";
import { sendAllExams, sendAllQuestions, sendAllSubjectQuestions, sendExamByExamID, sendResultToAllStudent, sendResultToStudent, TeacherCreateExam, TeacherDeleteExam, TeacherProfile, TeacherProfileUpdate, TeacherUpdateExam } from "../controllers/Teacher.js";
const TeacherRoute = express.Router();

TeacherRoute.get("/profile",TeacherProfile);
TeacherRoute.post("/profile/update",TeacherProfileUpdate);

TeacherRoute.post("/Exam/Create",TeacherCreateExam);
TeacherRoute.get("/Exam/:ExamID/Delete",TeacherDeleteExam);
TeacherRoute.post("/Exam/:ExamID/Update",TeacherUpdateExam);


TeacherRoute.get("/view/Question",sendAllQuestions);
TeacherRoute.get("/View/:Subject/Question",sendAllSubjectQuestions);


TeacherRoute.get("/Exam/view",sendAllExams);
TeacherRoute.get("/Exam/view/:ExamID",sendExamByExamID);
TeacherRoute.get("/Exam/view/:ExamID/Result",sendResultToAllStudent);
TeacherRoute.get("/Exam/view/:ExamID/Result/Student/:StudentExamID",sendResultToStudent);
// TeacherRoute.get("/Exam/:ExamID/Result/:Subject",sendDetailsOfSubjectByExamName);


export default TeacherRoute;