import { Request, Response, NextFunction } from "express";
import { validateToken } from "../utils/index.js";

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let jwt = req.headers.authorization;

    // verify request has token
    if (!jwt) {
      return res.status(401).json({ message: "Invalid token " });
    }

    // remove Bearer if using Bearer Authorization mechanism
    if (jwt.toLowerCase().startsWith("bearer")) {
      jwt = jwt.slice("bearer".length).trim();
    }

    await validateToken(jwt);

    next();
  } catch (error) {
    if (error instanceof Error && error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Expired token" });
      return;
    }

    res.status(401).json({ message: "Failed to authenticate user" });
  }
};
