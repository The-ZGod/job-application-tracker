import express from "express";
import prisma from "../lib/prisma.js"

const router = express.Router();

router.get("/users", async (req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.json(users);
    }catch(error){
        res.status(500).json({
            message: "Failed to fetch users!",
        })
    }
})

export default router;