import express from "express";
import prisma from "../lib/prisma.js"

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
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });

        res.status(201).json(user);
    }catch (error) {
        res.status(500).json({
            message: "Failed to create user!",
        });
    }
});

export default router;