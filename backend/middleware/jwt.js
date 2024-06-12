import jwt from "jsonwebtoken";

export const signToken = async (payload) => {
  let token = jwt.sign(
    {
      data: payload,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );

  return token;
};

export const verifyToken = (token) => {
  let decode = jwt.verify(token, process.env.SECRET_KEY);

  return decode;
};
// export default { signToken, verifyToken };
