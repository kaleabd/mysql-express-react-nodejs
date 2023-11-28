import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import companyRoutes from "./routes/companyRoutes";

config(); // Load environment variables from .env file

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/api", companyRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
