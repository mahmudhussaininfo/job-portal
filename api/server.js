import express from "express";
import cors from "cors";
import "dotenv/config";
import colors from "colors";
import cookieParser from "cookie-parser";
import mongoDbConnection from "./db/config.js";
import "./db/instrument.js";
import * as Sentry from "@sentry/node";
import router from "../api/routes/api.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://job-portal-client-brown.vercel.app",
    ],
    credentials: true,
  })
);

// routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.use("/api", router);

// connect to mongodb
mongoDbConnection();

// handle errror with sentry
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgBlue.bold);
});
