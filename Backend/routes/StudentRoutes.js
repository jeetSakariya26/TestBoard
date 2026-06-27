import express from "express";
import {sendAllExamsToStudent,sendExamToStudent,sendExamToStudentStart,sendExamToStudentSubmit,sendResultToStudent,sendPracticeTestToStudent,sendPracticeTestToStudentStart,sendPracticeTestToStudentSubmit,sendPracticeTestResultToStudent, StudentProfile, StudentProfileUpdate} from "../controllers/Student.js"

const StudentRoute = express.Router();


StudentRoute.get("/profile",StudentProfile);
StudentRoute.post("/profile/update",StudentProfileUpdate);

StudentRoute.get("/Exam/view",sendAllExamsToStudent);
StudentRoute.get("/Exam/:ExamID",sendExamToStudent);
StudentRoute.get("/Exam/:ExamID/Start",sendExamToStudentStart);
StudentRoute.post("/Exam/:ExamID/Submit",sendExamToStudentSubmit);
StudentRoute.get("/Exam/:ExamID/Result",sendResultToStudent);



StudentRoute.get("PracticeTest/:ExamID",sendPracticeTestToStudent);
StudentRoute.get("PracticeTest/:ExamID/Start",sendPracticeTestToStudentStart);
StudentRoute.get("PracticeTest/:ExamID/Submit",sendPracticeTestToStudentSubmit);
StudentRoute.get("PracticeTest/:ExamID/Result",sendPracticeTestResultToStudent);




export default StudentRoute;