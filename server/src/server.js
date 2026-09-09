import express from "express";
import cors from "cors";
import testRoutes from "./routes/test.routes.js"
import userRouter from "./routes/user.routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", testRoutes);
app.use("/api", userRouter);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});