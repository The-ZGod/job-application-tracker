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