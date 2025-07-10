import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import compression from "compression";
import registerRouter from "./routes/register.js"
import loginRouter from "./routes/login.js";
import resultsRouter from "./routes/results.js";
import { connectDB } from "./utilities/connectDB.js";
import { fetchAndSaveResults } from "./middleware/fetchAndSave.js";


dotenv.config();
await connectDB();


const app = express();
const port = process.env.PORT || 5000;


//! CORS DEV MODE ORIGIN
const allowedOrigin = process.env.NODE_ENV === "development"
  ? "http://localhost:5173"
  : "https://lotto-j6xo.onrender.com"

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}))
//!

// PRODUCTION MODE
if (process.env.NODE_ENV === "production") {
  app.use(compression());
}
//

app.use(express.json());
app.use(cookieParser());

//? AUTO FETCH FUNCTION
fetchAndSaveResults()
setInterval(fetchAndSaveResults, 10*60*1000)

//!ROUTES
app.use("/results", resultsRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter)
//!

//!GLOBAL ERROR
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});
//!


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


