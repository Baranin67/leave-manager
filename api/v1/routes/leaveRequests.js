import express from "express";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import { leaveRequestsView, leaveRequestsCreate, leaveRequestsUpdate, leaveRequestsDelete } from "../controllers/leaveRequests.js";

const app = express.Router();

app.get(
    "/view",
    Validate,
    leaveRequestsView
);

app.put(
    "/create",
    Validate,
    leaveRequestsCreate
);

app.patch(
    "/update/:id",
    check('id')
        .isNumeric()
        .withMessage("ID needs to be numeric")
        .notEmpty()
        .withMessage("Leave Request ID is required"),
    Validate,
    leaveRequestsUpdate
)

app.delete(
    "/delete/:id",
    check('id')
        .isNumeric()
        .withMessage("ID needs to be numeric")
        .notEmpty()
        .withMessage("Leave Request ID is required"),
    Validate,
    leaveRequestsDelete
)

export default app;