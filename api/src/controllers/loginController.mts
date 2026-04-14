import bcrypt from "bcryptjs";
import type { LoginRequest } from "../models/requests/loginRequest.mjs";
import UserModel, { convertUserToDto } from "../models/userSchema.mjs";

export const loginUser = async (request: LoginRequest) => {
  const foundUser = await UserModel.findOne({ email: request.email });

  if (!foundUser) {
    throw Error("Could not find user with email");
  }

  const success = await bcrypt.compare(request.password, foundUser.password);

  if (success) {
    return convertUserToDto(foundUser);
  }

  return null;
};
