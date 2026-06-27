import express from "express";
import Student from "../model/StudentSchema.js";
import Teacher from "../model/TeacherSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";




export const AuthenticationForStudent = async (req,res) => {
    try {
        const {Email,Password} = req.body;
        const user =await Student.findOne({Email : Email});
        if(!user){
            res.send({
                success : false,
                message : "user not found"
            });
        }
        const isMatch = await bcrypt.compare(Password,user.Password);
        if(!isMatch){
            res.send({
                success : false,
                message : "invalid credentials"
            });
        }
        const token = jwt.sign({Email : user.Email,Role : "Student"}, process.env.JWT_SECRET, {expiresIn : "7d"});
        res.status(200).cookie("token",token, {httpOnly : true,maxAge : 7*24*60*60*1000}).send({
            success : true,
            message : "login successfull",
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}

export const AuthenticationForTeacher =async (req,res) => {
    try {
        const {Email,Password} = req.body;
        const user =await Teacher.findOne({Email : Email});
        if(!user){
            res.send({
                success : false,
                message : "user not found"
            })
        }
        const isMatch =await bcrypt.compare(Password,user.Password);
        if(!isMatch){
            res.send({
                success : false,
                message : "invalid credentials"
            });
        }
        const token = jwt.sign({Email : user.Email,Role : "Teacher"}, process.env.JWT_SECRET, {expiresIn : "7d"});
        res.status(200).cookie("token",token, {httpOnly : true,maxAge : 7*24*60*60*1000}).send({
            success : true,
            message : "login successfull",
        });
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
}


export const LogoutForUser = (req,res) => {
    res.clearCookie("token");
    res.send({
        success : true,
        message : "logout successfull"
    });
}

