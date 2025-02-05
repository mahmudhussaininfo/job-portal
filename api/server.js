import express from "express";
import cors from "cors";
import "dotenv/config";
import colors from "colors";
import cookieParser from "cookie-parser";
import mongoDbConnection from "./db/config.js";
import "./db/instrument.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controller/webhooks.js";
import companyController from "../api/routes/api.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(clerkMiddleware());

// routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/hello", (req, res) => {
  res.send("mahmud!");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks);
app.use("/api", companyController);

// handle errror with sentry
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  mongoDbConnection();
  console.log(`Server is running on port ${PORT}`.bgBlue.bold);
});
