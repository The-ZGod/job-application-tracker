import express from "express";
import cors from "cors";
import testRoutes from "./routes/test.routes.js"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"

const app = express();

// Midleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api", testRoutes);
app.use("/api", userRoutes);
app.use("/api", authRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});