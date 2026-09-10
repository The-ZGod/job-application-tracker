import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("Authorization:", authHeader);

    if (!authHeader) {
        return res.status(401).json({
            message: "Access denied",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        // console.log("JWT error:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

export default authMiddleware;