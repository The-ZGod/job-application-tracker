import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.get("/test", async (req, res) => {
    const users = await prisma.user.findMany();

    res.json({
        message: "Hello from test route!",
        users,
    });
});

export default router;