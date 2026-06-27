import Question from "../model/QuestionSchema.js";
import PracticeTest from "../model/PracticeSchema.js";
import Admin from "../model/AdminSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import csv from "csvtojson";

export const SignUpForAdmin = async (req,res) => {
    try {
        console.log(req.body);
        const {Email,Password} = req.body;
        const user = await Admin.findOne({Email : Email});
        if(user){
            res.status(400).send({
                success : false,
                message : "user already exist"
            });
        }
        else{
            const NewUser = new Admin({
                Email : Email,
                Password : await bcrypt.hashSync(Password,10)
            });
            await NewUser.save();
            res.status(200).send({
                success : true,
                message : "user created successfully"
            });
        }
    }catch(error){
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}


export const LoginToAdminPage = async(req,res) => {
    try {
        const {Email,Password} = req.body;
        const user = await Admin.findOne({Email : Email});
        if(!user){
            res.status(400).send({
                success : false,
                message : "user not found"
            });
        }
        const isMatch = await bcrypt.compare(Password,user.Password);
        if(!isMatch){
            res.status(400).send({
                success : false,
                message : "invalid credentials"
            });
        }
        else{
            const token = jwt.sign({Email : user.Email,Role : "Admin"}, process.env.JWT_SECRET, {expiresIn : "7d"});
            res.status(200).cookie("token",token, {httpOnly : true,maxAge : 7*24*60*60*1000}).send({
                success : true,
                message : "login successfull",
            });
        }
    }catch(error){
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
};

export const LogoutToAdminPage = (req,res) => {
    res.clearCookie("token");
    res.send({
        success : true,
        message : "logout successfull"
    });
}


export const AddQuestionToBank = async (req,res) => {
    try {
        const QuestionData = req.body;
        const Que = new Question(QuestionData);
        await Que.save();
        res.status(200).send({
            success : true,
            message : "question added successfully"
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
};


export const AddPracticeTestToAll = async (req,res) => {
    try{
        const QuestionData = req.body;
        const Exam = new PracticeTest(QuestionData);
        await Exam.save();
        res.status(200).send({
            success : true,
            message : "question added successfully"
        });
    }catch(error){
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}


export const sendAllQuestionInBank = async (req,res) => {
    try {
        const AllQuestions = await Question.find();
        res.status(200).send({
            success : true,
            Questions : AllQuestions
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const ChangeDetailsOfQuestion = async (req,res) => {
    try {
        const QuestionID = req.params.QuestionID;
        const Que = await Question.findOne({QuestionID : QuestionID});
        if(!Que){
            res.status(400).send({
                success : false,
                message : "question not found"
            });
        }

        const QuestionData = req.body;
        await Question.updateOne({QuestionID : QuestionID},QuestionData);
        res.status(200).send({
            success : true,
            message : "question updated successfully"
        });
    } catch (error) {
        res.status(400).send({
            success : false,
            message : error.message
        });
    }
};

export const DeleteQuestionFromID = async (req,res) => {
    try {
        const QuestionID = req.params.QuestionID;
        const Que = await Question.findOne({QuestionID : QuestionID});
        if(!Que){
            res.status(400).send({
                success : false,
                message : "question not found"
            });
        }

        await Question.deleteOne({QuestionID : QuestionID});
        res.status(200).send({
            success : true,
            message : "question deleted successfully"
        }); 
    } catch (error) {
        res.status(400).send({
            success : false,
            message : error.message
        })     
    }
};


export const AddCSVQuestionToBank = async(req,res) => {
    try {
        console.log(req.files);
        const filepath = req.files[0].path;
        const Questions = await csv({
            colParser:{
                PreviousJeeQuestion : (value) => {
                    if(value.toLocaleLowerCase() === "true"){
                        return true;
                    }
                    return false;
                },
                PreviousJeeAdvancedQuestion : (value) => {
                    if(value.toLocaleLowerCase() === "true"){
                        return true;
                    }
                    return false;
                }
            }
        }).fromFile(filepath);
        await Question.insertMany(Questions);
        res.status(200).send({
            success : true,
            message : "questions added successfully"
        });
    } catch (error) {
        res.status(400).send({
            success : false,
            message : error.message
        })
    }
}