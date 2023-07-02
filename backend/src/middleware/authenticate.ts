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
      // Get the JWT token from the request headers
      const token = req.headers.authorization?.split(" ")[1];
      console.log(token);

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

      console.log(decodedToken);

      // Find the user by ID
      const user = await User.findByPk(decodedToken.userId);
      console.log(user);

      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Check if the user has the required role
      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      // Set the user information on the request object
      req.user = { id: user.id, role: user.role };

      next();
    } catch (error) {
      console.error("Error authorizing user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

export default authorize;
