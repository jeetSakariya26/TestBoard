import jwt from "jsonwebtoken";
import Student from "../model/StudentSchema.js";
import Teacher from "../model/TeacherSchema.js";

export const TokenParse = async (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        res.send({
            success : false,
            message : "token not found"
        });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        res.send({
            success : false,
            message : "invalid token"
        });
    }
    if(decoded.Role == "Student"){
        const user = await Student.findOne({Email : decoded.Email});
        req.user = user;
    }
    else if(decoded.Role == "Teacher"){
        const user = await Teacher.findOne({Email : decoded.Email});
        req.user = user;
    }
    next();
}