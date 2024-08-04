import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

// DOTENV CONFIG
dotenv.config();

//INTIALIZERS
const app = express();

// EXPRESS APP
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

//ENV VARIABLES
const PORT = process.env.SERVER_PORT;

// APP ROUTES
app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello",
  });
});

app.use("/api/v1", routes);

// FUNCTIONS
app.listen(PORT, () => {
  try {
    console.log("Server running on the port " + PORT);
  } catch (err) {
    console.log("Error while running the server " + err);
  }
});
