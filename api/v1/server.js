import express from "express";
import cors from "cors";
import { PORT, URI } from "./config/index.js";
import router from "./routes/index.js";
import cookieParser from 'cookie-parser';

// === 1 - CREATE SERVER ===
const app = express();

// Allow request from any source. In real production, this should be limited to allowed origins only
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.disable("x-powered-by"); //Reduce fingerprinting
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Connect Route handler to server
router(app);

// START UP SERVER
app.listen(PORT, '0.0.0.0' ,() =>
    console.log(`Server running on http://localhost:${PORT}`)
);