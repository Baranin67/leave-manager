import express from "express";
import Validate from "../middleware/validate.js";
import { authenticate } from "../middleware/verify.js";
import { check } from "express-validator";
import { userView, userCreate, userUpdate, userDelete } from "../controllers/users.js";

const app = express.Router();

app.get(
    "/view",
    Validate,
    userView
);

app.put(
    "/create",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("firstName")
        .not()
        .isEmpty()
        .withMessage("Your first name is required")
        .trim()
        .escape(),
    check("lastName")
        .not()
        .isEmpty()
        .withMessage("Your last name is required")
        .trim()
        .escape(),
    Validate,
    userCreate
);

app.patch(
    "/update/:id",
    check('id')
        .isNumeric()
        .withMessage("ID needs to be numeric")
        .notEmpty()
        .withMessage("User ID is required"),
    Validate,
    userUpdate
)

app.delete(
    "/delete/:id",
    check('id')
        .isNumeric()
        .withMessage("ID needs to be numeric")
        .notEmpty()
        .withMessage("User ID is required"),
    Validate,
    userDelete
)

export default app;