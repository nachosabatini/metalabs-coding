import express, { Response } from "express";
import authorize, { AuthenticateRequest } from "../middleware/authenticate";
import User, { UserRole } from "../models/User";

const router = express.Router();

// GET /user - Get user by ID
router.get(
  "/user",
  authorize([UserRole.Admin, UserRole.User]),
  async (req: AuthenticateRequest, res: Response) => {
    try {
      const userId = req.user?.id;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
