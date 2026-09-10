import express from "express";
import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "Email and Password are required!",
        });
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if(!user){
        return res.status(401).json({
            message: "Invalid Email or password!",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid Email or password!",
        });
    }

    return res.json({
        message: "Login successful!",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    });
});

export default router;
