import { tokenDecode } from "../utils/token.js";

export default (req, res, next) => {
  let token = req.cookies.Token;
  let decoded = tokenDecode(token);

  if (!decoded) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const isProduction = process.env.NODE_ENV === "production";

  // set cookie for refesh token
  const options = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: "none",
  };

  res.cookie("Token", decoded.refreshToken, options);

  let id = decoded.id;
  req.body.id = id;
  next();
};
