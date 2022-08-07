import jwt from "jsonwebtoken";
import { TokenPayload } from "./types.js";

export const validateToken = (token: string): Promise<TokenPayload> => {
  const secretKey = process.env.JWT_SECRET;
  const verifyOptions: jwt.VerifyOptions = {
    algorithms: ["HS256"]
  };

  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, verifyOptions, (error, decoded: TokenPayload) => {
      if (error) return reject(error);

      resolve(decoded);
    });
  });
};
