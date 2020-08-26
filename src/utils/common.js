import jwt from "jsonwebtoken";
import randomstring from "randomstring";

export const generatorSecret = () => {
  return randomstring.generate();
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
