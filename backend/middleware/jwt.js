import jwt from "jsonwebtoken";

export const signToken = async (payload) => {
  let token = jwt.sign(
    {
      data: payload,
    },
    "secret",
    { expiresIn: "24h" }
  );

  return token;
};

export const verifyToken = (token) => {
  let decode = jwt.verify(token, "secret");

  return decode;
};
// export default { signToken, verifyToken };
