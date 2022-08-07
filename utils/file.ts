import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export const fileToBase64 = (filePath: string) => {
  const encodedFile = fs.readFileSync(filePath, { encoding: "base64" });

  return encodedFile;
};

export const getCurrentDirectory = () => {
  const __filename = fileURLToPath(import.meta.url);
  return path.dirname(__filename);
};
