import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { router } from "./route";
dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(router);
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
