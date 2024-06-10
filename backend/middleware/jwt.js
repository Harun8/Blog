import jwt from "jsonwebtoken";

const signToken = async (payload) => {
  let token = jwt.sign(
    {
      data: payload,
    },
    "secret",
    { expiresIn: "24h" }
  );

  return token;
};

// const verifyToken = async(payload) => {

// }
export default signToken;
