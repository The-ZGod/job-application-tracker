import express from "express";
import prisma from "../lib/prisma.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/applications", authMiddleware, async (req, res) => {
    const { company, position, status, appliedDate, jobUrl, notes } = req.body;

    if (!company || !position) {
        return res.status(400).json({
            message: "Company and position are required",
        });
    }

    try {
        const application = await prisma.jobApplication.create({
            data: {
                userId: req.userId,
                company,
                position,
                status: status || "APPLIED",
                appliedDate: appliedDate ? new Date(appliedDate) : undefined,
                jobUrl,
                notes,
            },
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create job application",
        });
    }
});


router.get("/applications", authMiddleware, async (req, res) => {
    try {
        const applications = await prisma.jobApplication.findMany({
            where: {
                userId: req.userId,
            },
        });

        res.json(applications);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch job applications",
        });
    }
});

router.put("/applications/:id", authMiddleware, async (req, res) => {
    const applicationId = Number(req.params.id);

    const { company, position, status, appliedDate, jobUrl, notes } = req.body;

    try {
        const application = await prisma.jobApplication.updateMany({
            where: {
                id: applicationId,
                userId: req.userId,
            },
            data: {
                company,
                position,
                status,
                appliedDate: appliedDate ? new Date(appliedDate) : undefined,
                jobUrl,
                notes,
            },
        });

        if (application.count === 0) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        res.json({
            message: "Application updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update job application",
        });
    }
});

router.delete("/applications/:id", authMiddleware, async (req, res) => {
    const applicationId = Number(req.params.id);

    try {
        const application = await prisma.jobApplication.deleteMany({
            where: {
                id: applicationId,
                userId: req.userId,
            },
        });

        if (application.count === 0) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        res.json({
            message: "Application deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete job application",
        });
    }
});

export default router;