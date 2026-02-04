const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");
const ROLES = require("../constants/roles");

const register = async ({ email, password }) => {
  // cek user existing
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error("Email already registered");
  }

  //hash pasword
  const hashPassword = await bcrypt.hash(password, 10);

  //Create user

  const user = await userRepository.createUser({
    email,
    password: hashPassword,
    role: ROLES.USER,
  });

  return user;
};

module.exports = {
  register,
};
