import express from "express";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import { companyCreate, companyDelete, companyUpdate, companyView } from "../controllers/company.js";

const app = express.Router();

app.get(
    "/view",
    Validate,
    companyView
);

app.put(
    "/create",
    Validate,
    companyCreate
);

app.patch(
    "/update/:id",
    check('id')
        .isNumeric()
        .withMessage("ID needs to be numeric")
        .notEmpty()
        .withMessage("Company ID is required"),
    Validate,
    companyUpdate
)

app.delete(
    "/delete/:id",
    check('id')
        .isNumeric()
        .withMessage("ID needs to be numeric")
        .notEmpty()
        .withMessage("Company ID is required"),
    Validate,
    companyDelete
)

export default app;