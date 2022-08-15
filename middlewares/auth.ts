import { Request, Response, NextFunction } from "express";
import { validateToken } from "../utils/index.js";

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let jwt = req.headers.authorization;

    // verify request has token
    if (!jwt) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // remove Bearer if using Bearer Authorization mechanism
    if (jwt.toLowerCase().startsWith("bearer")) {
      jwt = jwt.slice("Bearer".length).trim();
    }

    await validateToken(jwt);

    next();
  } catch (error) {
    const defaultErrorMessage = "Failed to authenticate user";

    if (error instanceof Error && errorMessageMap[error.name]) {
      return res.status(401).json({ message: errorMessageMap[error.name] });
    }

    res.status(500).json({ message: defaultErrorMessage });
  }
};

const errorMessageMap: Record<string, string> = {
  TokenExpiredError: "Expired token",
  JsonWebTokenError: "Invalid token",
};
