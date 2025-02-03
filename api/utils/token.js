import JWT from "jsonwebtoken";

export const tokenEncode = (email, id) => {
  const payload = { email, id };
  const key = process.env.JWT_KEY;
  const expire = { expiresIn: process.env.JWT_KEY_EXPIRED };
  return JWT.sign(payload, key, expire);
};
