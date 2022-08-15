import jwt from "jsonwebtoken";

export const validateToken = (token: string): Promise<jwt.Jwt> => {
  const secretKey = process.env.JWT_SECRET as jwt.Secret;
  const verifyOptions: any = {
    algorithms: ["HS256"],
  };

  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, verifyOptions, (error, decoded) => {
      console.log("error, decoded: ", error, decoded);
      if (error || !decoded) return reject(error);

      resolve(decoded);
    });
  });
};
