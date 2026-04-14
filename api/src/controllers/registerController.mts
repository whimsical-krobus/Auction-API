import type { RegisterRequest } from "../models/requests/registerRequest.mjs";
import bcrypt from "bcryptjs";
import UserModel, { convertUserToDto } from "../models/userSchema.mjs";

export const createUser = async (request: RegisterRequest) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(request.password, salt);

  const user = {
    username: request.username,
    email: request.email,
    password: hashedPassword,
  };

  const theNewUser = await UserModel.create(user);

  return convertUserToDto(theNewUser);
};
