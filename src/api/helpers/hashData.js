// hashData.js

import bcrypt from "bcrypt";

const hashData = async (data) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedData = await bcrypt.hash(data, salt);

    return hashedData;
  } catch (error) {
    throw new Error(`Error hashing data: ${error.message}`);
  }
};

const InhashData = async (data, hash) => {
  try {
    console.log("pwd: ",hash)
    const InhashedData = await bcrypt.compare(data,hash);

    return InhashedData;
  } catch (error) {
    throw new Error(`Error comparing data: ${error.message}`);
  }
};

export { hashData, InhashData };
