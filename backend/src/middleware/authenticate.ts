// src/middleware/authenticate.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { UserRole } from "../models/User";

interface AuthenticateRequest extends Request {
  user?: {
    id: number | undefined;
    role: UserRole;
  };
}

const authorize = (roles: UserRole[]) => {
  return async (
    req: AuthenticateRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Verify and decode the JWT token
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as {
        userId: number;
      };

      const user = await User.findByPk(decodedToken.userId);

      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      req.user = { id: user.id, role: user.role };

      next();
    } catch (error) {
      console.error("Error authorizing user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

export default authorize;
