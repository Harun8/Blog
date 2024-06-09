import bcrypt from "bcrypt";
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const hashPassword = async (plainPassword) => {
  try {
    let hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log("hashed Password", hashPassword);

    return hashedPassword;
  } catch (error) {
    console.log("error", error);
  }
};

export default hashPassword;
