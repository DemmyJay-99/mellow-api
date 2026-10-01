import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import router from "./routes/plugins.js";
import adminRouter from "./routes/admin.route.js";
configDotenv();

const app = express();
const PORT: number = Number(process.env.PORT) || 8000;
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use("/api/admin", adminRouter)

app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`);
});
