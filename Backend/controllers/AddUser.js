import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Student from "../model/StudentSchema.js";
import Teacher from "../model/TeacherSchema.js";
import PendingStudent from "../model/PendingStudentSchema.js";



export const AddStudent = async (req,res) => {
    try {
        const {Name,Email,Password,CollageName} = req.body;
        console.log(req.body);
        const user = await Student.exists({Email : Email});
        if(user){
            res.status(400).send({
                success : false,
                message : "user already exist"
            });
            return;
        }      
        const pendingUser = await PendingStudent.findOne({Email : Email});
        let NewUser;
        if(pendingUser){
            NewUser = new Student({
                Name : Name,
                Email : Email,
                Password :await bcrypt.hashSync(Password,10),
                CollageName : CollageName,
                ExamsID : pendingUser.ExamsID,
            })
        }else{
            NewUser = new  Student({
                Name : Name,
                Email : Email,
                Password :await bcrypt.hashSync(Password,10)
            });
        }
        await NewUser.save();
        res.status(200).send({
            success : true,
            message : "user created successfully"
        });
        return ;
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
};


export const AddTeacher = async(req,res) => {
    try {
        const {Name,Email,Password,CollageName} = req.body;
        console.log(req.body);
        const user =await Teacher.exists({Email : Email});
        if(user){
            res.send({
                success : false,
                message : "user already exist"
            });
        return;
        }      
        const NewUser = new Teacher({
            Name : Name,
            Email : Email,
            Password : await bcrypt.hashSync(Password,10),
            CollageName : CollageName
        });
        await NewUser.save();
        res.status(200).send({
            success : true,
            message : "user created successfully"
        });
        return ;
    } catch (error) {
        res.status(401).send({
            success : false,
            message : error.message
        })
    }
};
