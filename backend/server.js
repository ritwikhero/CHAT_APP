import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

import connectToMongoDb from "./db/dbConnection.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // extract incoming json data
app.use(cookieParser()); // extracts cookie from the header
app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes)

// app.get("/",(req,res)=>{
//     //root route http://localhost:8000/
//     res.send("Hello World");
// })


app.listen(PORT, () =>{
    connectToMongoDb();
    console.log(`Server running on port ${PORT}`)
});
