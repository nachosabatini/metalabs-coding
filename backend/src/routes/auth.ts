import express from "express";
import { register, login, logout } from "../controllers/authController";
import authorize from "../middleware/authenticate";
import { UserRole } from "../models/User";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

// Example route that requires 'admin' role
router.get("/admin-only", authorize([UserRole.Admin]), (req, res) => {
  res.send("Welcome, Admin!");
});

export default router;
