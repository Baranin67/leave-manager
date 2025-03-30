import express from "express";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import { login, logout } from "../controllers/auth.js";
import { authenticate } from "../middleware/verify.js";

const app = express.Router();

app.patch(
    "/login",
    Validate,
    login
);

app.patch(
    "/logout",
    Validate,
    authenticate(false),
    logout
);

export default app;