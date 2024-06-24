import bcrypt from "bcryptjs";
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const hashPassword = async (plainPassword) => {
  try {
    let hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    return hashedPassword;
  } catch (error) {
    console.log("error", error);
  }
};

export default hashPassword;
