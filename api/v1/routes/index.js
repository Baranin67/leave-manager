import express from "express";
//import { Verify, VerifyRole } from '../middleware/verify.js';
import users from "../routes/users.js"
import leaveRequests from "../routes/leaveRequests.js"
import company from "../routes/company.js"
import address from "../routes/address.js"
import auth from "../routes/auth.js"

const router = (app) => {
    
    app.use(express.json());
    
    app.use("/api/v1/users", users)
    app.use("/api/v1/leaveRequests", leaveRequests)
    app.use("/api/v1/company", company)
    app.use("/api/v1/address", address)
    app.use("/api/v1/auth", auth)

    // home route with the get method and a handler
    app.get("/api/v1", (req, res) => {
        try {
            res.status(200).json({
                status: "success",
                data: [],
                message: "Welcome to our API homepage!",
            });
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    })
};

export default router;