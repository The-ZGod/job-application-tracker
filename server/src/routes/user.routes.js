import express from "express";

const router = express.Router();

router.get("/users", (req, res) => {
    res.json({
        message:"Users route is working!",
    })
})

export default router;