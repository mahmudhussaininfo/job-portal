import JWT from "jsonwebtoken";

// token Encode
export const tokenEncode = (id) => {
  const payload = { id };
  const key = process.env.JWT_KEY;
  const expire = { expiresIn: process.env.JWT_KEY_EXPIRED };
  return JWT.sign(payload, key, expire);
};

// token Decode
export const tokenDecode = (token) => {
  try {
    const key = process.env.JWT_KEY;
    const expire = { expiresIn: process.env.JWT_KEY_EXPIRED };
    const decode = JWT.verify(token, key);

    if (decode.id) {
      const refreshToken = JWT.sign(
        {
          id: decode.id,
        },
        key,
        expire
      );

      return {
        id: decode.id,
        refreshToken,
      };
    }
  } catch (error) {
    return null;
  }
};
