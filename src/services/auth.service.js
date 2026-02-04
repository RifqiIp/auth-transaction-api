const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  return { token };
};

module.exports = {
  register,
  login,
};
