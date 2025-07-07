import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import loginRouter from "./routes/login.js";
import resultsRouter from "./routes/results.js";
import { connectDB } from "./data/utilities/connectDB.js";
import { fetchAndSaveResults } from "./middleware/fetchAndSave.js";


dotenv.config();
await connectDB();


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

//? AUTO FETCH FUNCTION
fetchAndSaveResults()
setInterval(fetchAndSaveResults, 10*60*1000)

//!ROUTES
app.use("/results", resultsRouter);
app.use("/login", loginRouter);

//!GLOBAL ERROR
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


