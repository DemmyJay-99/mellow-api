import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import router from "./routes/plugins.js";
configDotenv();

const app = express();
const PORT: number = Number(process.env.PORT) || 8000;
app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`);
});
