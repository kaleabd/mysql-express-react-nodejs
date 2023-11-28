import { body, validationResult } from "express-validator";

const validationMiddleware = [
  body("name", "Name has to be at least 5 letters").isLength({ min: 5 }),
  body("email", "Invalid email").isEmail(),
  body("total_capital", "Total capital must be a number").isNumeric(),
];

export default validationMiddleware;
