import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import siteRoutes from './routes/siteRoutes.js';
import cors from 'cors';

dotenv.config();
//database connect
connectDB();
const app = express();
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use("/api/v1/site", siteRoutes);


//rest api
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to Indian Tourism</h1>")
    
});
const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})