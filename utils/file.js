import fs from "fs";

export const fileToBase64 = (path) => {
  const encodedFile = fs.readFileSync(path, { encoding: "base64" });

  return encodedFile;
};
