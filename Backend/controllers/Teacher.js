import Question from "../model/QuestionSchema.js";
import CreateExam from "../model/ExamSchema.js";
import StudentExam from "../model/StudentExamSchema.js";
import Student from "../model/StudentSchema.js";
import Teacher from "../model/TeacherSchema.js";
import PendingStudent from "../model/PendingStudentSchema.js";
import { AnalisisSchema } from "../model/StudentExamSchema.js";


export const TeacherProfile = async (req,res) => {
    try {
        res.status(200).send({
            success : true,
            User : req.user
        })
    } catch (error) {
        res.status(400).send({
            success : false,
            message : error.message
        })
    }
}

export const TeacherProfileUpdate = async (req,res) => {
    try {
        const TeacherID = req.user._id;
        const Teacher = await Teacher.findOneAndUpdate({TeacherID : TeacherID},req.body);
        if(!Teacher){
            res.status(400).send({
                success : false,
                message : "Teacher Profile not found"
            });
        }
        res.status(200).send({
            success : true,
            message : "Profile updated successfully"
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const TeacherCreateExam = async (req,res) => {
    try {
        const Students = req.body.EmailID;
        const studentID = [];
        const PendingStudentID = [];

        for(const student of Students){
            const studentData = await Student.findOne({Email : student});
            if(!studentData){
                const PendingStudentDetails = await PendingStudent.findOne({Email : student});
                if(!PendingStudentDetails){
                    const NewPendingStudent = new PendingStudent({
                        Email : student
                    })
                    await NewPendingStudent.save();
                    PendingStudentID.push(NewPendingStudent._id);
                }else{  
                    PendingStudentID.push(PendingStudentDetails._id);
                }
            }else{
                studentID.push(studentData._id);
            }
        }

        const Exam = new CreateExam({
            ExamName : req.body.ExamName,
            ExamDescription : req.body.ExamDescription,
            TotalMarks : req.body.TotalMarks,
            Creater : req.user._id,
            Questions : req.body.Questions,
            StartTime : req.body.StartTime,
            Duration : req.body.Duration,
            EndTime : req.body.EndTime,
            StudentID : studentID,
            PendingStudentID : PendingStudentID,
            TotalQuestions : req.body.TotalQuestions,
        });
        await Exam.save();
        const User = await Teacher.findOne({_id : req.user._id});
        if(!User){
            res.status(400).send({
                success : false,
                message : "User not found"
            });
        }
        User.ExamsDetails.push({
            ExamID : Exam._id,
            ExamName : Exam.ExamName,
            TotalMarks : Exam.TotalMarks,
            TotalQuestion : Exam.TotalQuestions,
        })
        await User.save();
        for(const student of PendingStudentID){
            const studentData = await PendingStudent.findOne({_id : student});
            studentData.Exam.push(Exam._id);
            await studentData.save();
        }
        for(const student of studentID){
            const studentData = await Student.findOne({_id : student});
            studentData.ExamsDetails.push({
                ExamID : Exam._id,
                ExamName : Exam.ExamName,
                TotalMarks : Exam.TotalMarks,
                State : "Pending",
                ExamDescription : Exam.ExamDescription
            });
            await studentData.save();
        }
        res.status(200).send({
            success : true,
            message : "Exam created successfully",
            ExamID : Exam._id
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const TeacherDeleteExam = async (req,res) => {
    try {
        const ExamID = req.params.ExamID;
        const Exam = await CreateExam.findOneAndDelete({ExamID : ExamID});
        if(!Exam){
            res.status(400).send({
                success : false,
                message : "Exam not found"
            });
        }
        const User = await Teacher.findOne({_id : req.user._id});
        if(!User){
            res.status(400).send({
                success : false,
                message : "User not found"
            });
        }
        User.ExamsDetails = User.ExamsDetails.filter((exam) => {
            return exam.ExamID != ExamID
        });
        await User.save();
        res.status(200).send({
            success : true,
            message : "Exam deleted successfully"
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const TeacherUpdateExam = async (req,res) => {
    try {
        const ExamID = req.params.ExamID;
        const Exam = await CreateExam.findOne({_id : ExamID});

        const Students = req.body.EmailID;
        const studentID = [];
        const PendingStudentID = [];

        for(const student of Students){
            const studentData = await Student.findOne({Email : student});
            if(!studentData){
                const PendingStudentDetails = await PendingStudent.findOne({Email : student});
                if(!PendingStudentDetails){
                    const NewPendingStudent = new PendingStudent({
                        Email : student
                    })
                    await NewPendingStudent.save();
                    PendingStudentID.push(NewPendingStudent._id);
                }else{  
                    PendingStudentID.push(PendingStudentDetails._id);
                }
            }else{
                studentID.push(studentData._id);
            }
        }

        if(!Exam){
            res.status(400).send({
                success : false,
                message : "Exam not found"
            });
        }
        Exam.ExamName = req.body.ExamName;
        Exam.ExamDescription = req.body.ExamDescription;
        Exam.TotalMarks = req.body.TotalMarks;
        Exam.Questions = req.body.Questions;
        Exam.StudentID = studentID;
        Exam.PendingStudentID = PendingStudentID;
        Exam.TotalQuestions = req.body.TotalQuestions;
        Exam.StartTime = req.body.StartTime;
        Exam.EndTime = req.body.EndTime;
        await Exam.save();
        res.status(200).send({
            success : true,
            message : "Exam updated successfully"
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const sendAllQuestions = async (req,res) => {
    try {
        const listofQuestion = await Question.find();
        res.status(200).send({
            success : true,
            message : "Question send successfully",
            Question : listofQuestion
        })
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const sendAllSubjectQuestions = async (req,res) => {
    try {
        const Subject = req.params.Subject;
        const listofQuestion = await Question.find({Subject:Subject});
        res.status(200).send({
            success : true,
            message : "Question send successfully",
            Question : listofQuestion
        });
    } catch (error) {
        res.status(401).send({
            success : true,
            message : error.message
        })
    }
}

export const sendAllExams = async (req,res) => {
    try {
        console.log(req.user);
        const Exams = req.user.ExamsDetails;
        console.log(Exams);
        res.status(200).send({
            success : true,
            ExamsDetails : Exams
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const sendExamByExamID = async (req,res) => {
    try {
        const ExamID = req.params.ExamID;
        const Exam = await CreateExam.findOne({ExamID : ExamID});
        if(!Exam){
            res.status(400).send({
                success : false,
                message : "Exam not found"
            });
        }
        const QuestionDetails = [];
        for(const questionID of Exam.Questions){
            const question = await Question.findOne({QuestionID : questionID});
            QuestionDetails.push(question);
        }
        const ExamDetails = {
            ExamName : Exam.ExamName,
            ExamDescription : Exam.ExamDescription,
            StartTime : Exam.StartTime,
            Duration : Exam.Duration,
            EndTime : Exam.EndTime,
            TotalMarks : Exam.TotalMarks,
            TotalQuestion : Exam.TotalQuestion,
            Creater : Exam.Creater,
            QuestionDetails : QuestionDetails,
            Result : Exam.IsResultAnnounced ? Exam.Analist : null
        } 
        res.status(200).send({
            success : true,
            Exam : Exam
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const sendResultToAllStudent = async (req,res) => {
    try {
        const ExamID = req.params.ExamID;
        const Exam = await CreateExam.findOne({ExamID : ExamID});
        const QuestionID = Exam.Questions;
        let QuestionToAnswer = new Map();
        let Subjects = new Set();
        QuestionID.forEach(async (questionID) => {
            const QuestionDetails = await Question.findOne({QuestionID : questionID});
            QuestionToAnswer.set(questionID,QuestionDetails);
            Subjects.add(QuestionDetails.Subject);
        });
        
        for(const studentID of Exam.StudentID){
            const student = await Student.findOne({_id : studentID});
            const studentResult = await StudentExam.findOne({StudentID : studentID});
            let SubjectDetails = [];
            for(const subject of Subjects){
                const subjectDetails = {
                    SubjectName : subject,
                    Correct : 0,
                    Incorrect : 0,
                    Unattempted : 0,
                    TotalMarks : 0,
                    TotalQue: 0,
                    ObtainedMarks : 0,
                };
                SubjectDetails.push(subjectDetails);
            }
            const newAnalisis = new AnalisisSchema({
                Correct : 0,
                Incorrect : 0,
                Unattempted : 0,
                Subject : SubjectDetails
            });
            studentResult.ChoosenAnswer.forEach((que) => {
                const QuestionDetails = QuestionToAnswer.get(que.QuestionID);
                studentResult.Analisis.Subject.find((subject) => subject.SubjectName === QuestionDetails.Subject).TotalMarks += QuestionDetails.MarkForCorrect;
                if(que.IsAttempted){
                    studentResult.AttemptedQue += 1;
                    if(que.Choosen === QuestionDetails.Answer){
                        // Answer is correct 
                        studentResult.ObtainedMarks += QuestionDetails.MarkForCorrect;
                        studentResult.Analisis.Correct += 1;
                        studentResult.Analisis.Subject.find((subject) => subject.SubjectName === QuestionDetails.Subject).Correct += 1;
                        studentResult.Analisis.Subject.find((subject) => subject.SubjectName === QuestionDetails.Subject).TotalQue += 1;
                        studentResult.Analisis.Subject.find((subject) => subject.SubjectName === QuestionDetails.Subject).ObtainedMarks += QuestionDetails.MarkForCorrect;
                    }else{
                        // Answer is Incorrect
                        studentResult.ObtainedMarks += QuestionDetails.MarkForIncorrect;
                        studentResult.Analisis.Incorrect += 1;
                        studentResult.Analisis.Subject.find((subject) => subject.SubjectName === QuestionDetails.Subject).Incorrect += 1;
                        studentResult.Analisis.Subject.find((subject) => subject.SubjectName === QuestionDetails.Subject).TotalQue += 1;
                        studentResult.Analisis.Subject.find((subject) => subject.SubjectName === QuestionDetails.Subject).ObtainedMarks += QuestionDetails.MarkForIncorrect;
                    }
                }else{
                    // Not Attempted
                    studentResult.Analisis.Unattempted += 1;
                    studentResult.Analisis.Subject.find((subject) => subject.SubjectName === QuestionDetails.Subject).Unattempted += 1;
                    studentResult.Analisis.Subject.find((subject) => subject.SubjectName === QuestionDetails.Subject).TotalQue += 1;
                }
            })
        }
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}


export const sendResultToStudent = async (req,res) => {
    try {
        const StudentID = req.params.StudentID;
        const studentResult = await StudentExam.findOne({StudentID : StudentID});
        if(!studentResult){
            res.status(400).send({
                success : false,
                message : "Result not found"
            })
        }
        res.status(200).send({
            success : true,
            message : "Result found",
            Result : studentResult
        })
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}


