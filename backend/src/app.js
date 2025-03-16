import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit: "20kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}));

app.use(express.static("public"))

app.use(cookieParser())

// Import Routes
import userRouter from "./routes/user.routes.js"
import tiffinRouter from "./routes/tiffin.routes.js"
import orderRouter from "./routes/order.routes.js"
import reviewRouter from "./routes/review.routes.js"


// Declare Routes
app.use("/api/users", userRouter); 
app.use("/api/tiffin", tiffinRouter); 
app.use("/api/order", orderRouter); 
app.use("/api/review", reviewRouter); 

export {app};