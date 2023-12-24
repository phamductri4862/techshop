import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import morgan from "morgan";
import chalk from "chalk";
import apiRoutes from "./routes/apiRoutes.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const port = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//TODO: DELETE IT BEFORE DEPLOYING
app.use(morgan("dev"));
app.use("/test", (req, res) => {
  res.send("OK");
});

//!Middlewares
app.use(express.json());
app.use(cookieParser());

//!Routes
app.use("/api", apiRoutes);
app.use(notFound);

app.use(errorHandler);

await connectDB();
app.listen(port, () => {
  console.log(chalk.blue("Listening to port: " + port));
});
