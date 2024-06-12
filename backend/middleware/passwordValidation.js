import bcrypt from "bcryptjs";
const saltRounds = 10;

const passwordValidation = async (plainPassword, hashedPassword) => {
  try {
    let psv = await bcrypt.compare(plainPassword, hashedPassword);

    return psv;
  } catch (error) {
    console.log("error", error);
  }
};

export default passwordValidation;
