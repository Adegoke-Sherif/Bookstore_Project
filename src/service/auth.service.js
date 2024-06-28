import Jwt from "jsonwebtoken";
import User from "../database/model/user.schema.js"
import { ErrorWithStatus } from "../exception/error-with-status-exception.js";
import bcrypt from "bcrypt";

export const login = async (email, password) => {
  // check if email exists
  const user = await User.findOne({ email })
  if(!user) {
    throw new ErrorWithStatus("User not found", 404);
  }
  //Check if password is not correct
  if (!(await bcrypt.compare(password, user.password))){
  // if (!bcrypt.compareSyn(password, user.password)) 
    throw new ErrorWithStatus(" Username or password is incorrect", 401 );
  }
  // Generate access Token
  // const token = Buffer.from(`${user.email}:${user.password}`).toString("base64");
    const JWT_SECRET = process.env.JWT_SECRET || "secret";
    const token = Jwt.sign(
      { 
        role: user.role || "USER",
        email: user.email, 
        _id: user._id,
        sub: user._id },JWT_SECRET, { expiresIn: "1h"})
  return token;
}

export const register = async (name, email, password, role) => {
  //check if email exists
  const user = await User.findOne({ email });
  if(user) {
    throw new ErrorWithStatus("User already exits", 400);
  }
  //create new user
  password = await bcrypt.hash(password, 10);
  // password = bcrypt.hashSync(password, 10);
  const newUser = new User({
    name,
    email,
    password,
    role,
  })
  await newUser.save()

  delete newUser.password;
  return newUser;
}