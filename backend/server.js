import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDb from "./db/dbConnection.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    //root route http://localhost:8000/
    res.send("Hello World");
})
app.use("/api/auth",authRoutes);

app.listen(PORT, () =>{
    connectToMongoDb();
    console.log(`Server running on port ${PORT}`)
});
