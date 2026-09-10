import express from "express";
import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/users", async (req, res) => {
    try{
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        res.json(users);
    }catch(error){
        res.status(500).json({
            message: "Failed to fetch users!",
        });
    }
});

router.post("/users", async (req, res) => {
    const { name, email, password } = req.body;

    if( !name || !email || !password ){
        return res.status(400).json({
            message: "name, email and passwords are required!",
        });
    }

    if(password.length < 6){
        return res.status(400).json({
            message: "Password must be atleast 6 characters!",
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        return res.status(400).json({
            message: "Please Enter Valid Email!",
        });
    }

    try{
        //Hashing using bcrypt
        //10 is bcrypt salt more salt, more strong password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    }catch (error) {
        if(error.code == "P2002"){
            res.status(409).json({
                message: "Email already exists!",
            });
        }
        res.status(500).json({
            message: "Failed to create user!",
        });
    }
});

export default router;