import express from "express";
import multer from "multer";
import path from "path";


const Storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./uploads");
    },
    filename: function(req,file,cb){
        const fileName = Date.now() + file.originalname;
        cb(null,fileName);
    }
});


export const upload = multer({storage : Storage});