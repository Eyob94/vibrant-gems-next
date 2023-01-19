import crypto from "crypto";

// Generate random string
export const generateRandomString = () =>
  crypto.randomBytes(16).toString("hex");
