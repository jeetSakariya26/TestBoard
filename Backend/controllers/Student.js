import StudentExam from "../model/StudentExamSchema.js";
import CreateExam from "../model/ExamSchema.js";
import Question from "../model/QuestionSchema.js";


export const StudentProfile = async (req,res) => {
    try {
        const User = req.user;
        res.status(200).send({
            success : true,
            User : User
        })
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}


export const StudentProfileUpdate = async (req,res) => {
    try {
        const StudentID = req.user._id;
        const Student = await Student.findOneAndUpdate({StudentID : StudentID},req.body);
        if(!Student){
            res.status(400).send({
                success : false,
                message : "Student Profile not found"
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

export const sendAllExamsToStudent = async (req,res) => {
    try {
        const AllExams = res.user.ExamsDetails;
        const AllPracticeTest = res.user.PracticeTestDetails;
        res.status(200).send({
            success : true,
            Exams : AllExams,
            PracticeTest : AllPracticeTest
        })
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const sendExamToStudent = async (req,res) => {
    try {
        const ExamID = req.params.ExamID;
        const Exam = await CreateExam.findOne({ExamID : ExamID});
        if(!Exam){
            res.status(400).send({
                success : false,
                message : "Exam not found"
            });
        }
        const ExamDetails = {
            ExamName : Exam.ExamName,
            StartTime : Exam.StartTime,
            Duration : Exam.Duration,
            EndTime : Exam.EndTime,
            TotalMarks : Exam.TotalMarks,
            TotalQuestion : Exam.TotalQuestion,
            ExaxCreatedBy : Exam.Creater
        }
        res.status(200).send({
            success : true,
            ExamDetails : ExamDetails
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const sendExamToStudentStart = async (req,res) => {
    try {
        const ExamID = req.params.ExamID;
        const StartTime = req.body.StartTime;
        const Exam = await CreateExam.findOne({ExamID : ExamID});
        if(!Exam){
            res.status(400).send({
                success : false,
                message : "Exam not found"
            });
        }
        const Answer = [];
        const UserQuestion = [];
        Exam.Questions.forEach(async(question) => {
            const QuestionDetails = await Question.find({QuestionID : question});
            Answer.push({
                QuestionID : question,
                Choosen : null,
                IsAttempted : false
            });
            UserQuestion.push({
                QuestionID : question,
                Question : QuestionDetails,
                Choosen : null
            })
        });
        const NewExam = new StudentExam({
            ExamID : ExamID,
            StartTime : StartTime,
            Duration : Exam.Duration,
            TotalMarks : Exam.TotalMarks,
            TotalQuestions : Exam.TotalQuestions,
            ExaxCreatedBy : Exam.Creater,
            State : "Started",
            ChoosenAnswer : Answer,
        });
        await NewExam.save();
        res.send({
            success : true,
            Question : UserQuestion
        })
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })   
    }
}

export const sendExamToStudentSubmit = async (req,res) => {
    try {
        const ExamID = req.params.ExamID;
        const QuestionData = req.body.QuestionData;
        const EndTime = req.body.EndTime;
        const Exam = await StudentExam.findOne({ExamID : ExamID});
        if(!Exam){
            res.status(400).send({
                success : false,
                message : "Exam not found"
            });
        }
        Exam.ChoosenAnswer = QuestionData;
        Exam.EndTime = EndTime;
        Exam.State = "Completed";
        await Exam.save();
        res.status(200).send({
            success : true,
            message : "Exam submitted successfully"
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const sendResultToStudent = async (req,res) => {
    try {
        const ExamId = req.params.ExamID;
        const Exam = await StudentExam.findOne({ExamID : ExamId});
        if(!Exam){
            res.status(400).send({
                success : false,
                message : "Exam not found"
            });
        }

        res.status(200).send({
            success : true,
            Result : Exam
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}


export const sendAllPracticeTestToStudent = async (req,res) => {
    try {
        const AllExams = await 
        res.status(200).send({
            success : true,
            Exams : AllExams
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const sendPracticeTestToStudent = async (req,res) => {
    try {
        const ExamID = req.params.ExamID;
        const Exam = await PracticeTest.findOne({ExamID : ExamID});
        if(!Exam){
            res.status(400).send({
                success : false,
                message : "Exam not found"
            });
        }
        const ExamDetails = {
            ExamName : Exam.ExamName,
            StartTime : Exam.StartTime,
            Duration : Exam.Duration,
            EndTime : Exam.EndTime,
            TotalMarks : Exam.TotalMarks,
            TotalQuestion : Exam.TotalQuestion,
            ExaxCreatedBy : Exam.Creater
        }
        res.status(200).send({
            success : true,
            Question : Exam.Questions,
            ExamDetails : ExamDetails
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const sendPracticeTestToStudentStart = async (req,res) => {
    try {
        const ExamID = req.params.ExamID;
        const StartTime = req.body.StartTime;
        const Exam = await PracticeTest.findOne({ExamID : ExamID});
        if(!Exam){
            res.status(400).send({
                success : false,
                message : "Exam not found"
            });
        }
        const Answer = [];
        const UserQuestion = [];
        Exam.Questions.forEach(async(question) => {
            const Question = await Question.find({QuestionID : question});
            Answer.push({
                QuestionID : question,
                Choosen : null,
                IsAttempted : false
            });
            UserQuestion.push({
                QuestionID : question,
                Question : Question,
                Choosen : null
            })
        });
        const NewExam = new StudentExam({
            ExamID : ExamID,
            StartTime : StartTime,
            Duration : Exam.Duration,
            TotalMarks : Exam.TotalMarks,
            TotalQuestions : Exam.TotalQuestions,
            ExaxCreatedBy : Exam.Creater,
            State : "Started",
            ChoosenAnswer : Answer,
        });
        await NewExam.save();
        res.send({
            success : true,
            Question : UserQuestion
        })
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const sendPracticeTestToStudentSubmit = async (req,res) => {
    try {
        const ExamID = req.params.ExamID;
        const QuestionData = req.body.QuestionData;
        const EndTime = req.body.EndTime;
        const Exam = await StudentExam.findOne({ExamID : ExamID});
        if(!Exam){
            res.status(400).send({
                success : false,
                message : "Exam not found"
            });
        }
        Exam.ChoosenAnswer = QuestionData;
        Exam.EndTime = EndTime;
        Exam.State = "Completed";
        await Exam.save();
        res.status(200).send({
            success : true,
            message : "Exam submitted successfully"
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const sendPracticeTestResultToStudent = async (req,res) => {
    try {
        const ExamId = req.params.ExamID;
        const Exam = await StudentExam.findOne({ExamID : ExamId});
        if(!Exam){
            res.status(400).send({
                success : false,
                message : "Exam not found"
            });
        }
        res.status(200).send({
            success : true,
            Result : Exam
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}
