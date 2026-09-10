import express from "express";
import prisma from "../lib/prisma.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, async (req, res) => {
    try {
        const total = await prisma.jobApplication.count({
            where: {
                userId: req.userId,
            },
        });

        const applied = await prisma.jobApplication.count({
            where: {
                userId: req.userId,
                status: "APPLIED",
            },
        });

        const interview = await prisma.jobApplication.count({
            where: {
                userId: req.userId,
                status: "INTERVIEW",
            },
        });

        const offer = await prisma.jobApplication.count({
            where: {
                userId: req.userId,
                status: "OFFER",
            },
        });

        const rejected = await prisma.jobApplication.count({
            where: {
                userId: req.userId,
                status: "REJECTED",
            },
        });

        const withdrawn = await prisma.jobApplication.count({
            where: {
                userId: req.userId,
                status: "WITHDRAWN",
            },
        });

        res.json({
            total,
            applied,
            interview,
            offer,
            rejected,
            withdrawn,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch dashboard statistics",
        });
    }
});

export default router;