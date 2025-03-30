import express from "express";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import { addressCreate, addressDelete, addressUpdate, addressView } from "../controllers/address.js";

const app = express.Router();

app.get(
    "/view",
    Validate,
    addressView
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
    addressCreate
);

app.patch(
    "/update/:id",
    check('id')
        .isNumeric()
        .withMessage("ID needs to be numeric")
        .notEmpty()
        .withMessage("Address ID is required"),
    Validate,
    addressUpdate
)

app.delete(
    "/delete/:id",
    check('id')
        .isNumeric()
        .withMessage("ID needs to be numeric")
        .notEmpty()
        .withMessage("Address ID is required"),
    Validate,
    addressDelete
)

export default app;