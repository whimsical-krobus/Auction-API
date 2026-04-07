import { model, Schema, type InferSchemaType } from "mongoose";
import type { UserDTO } from "./userDto.mjs";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model("user", userSchema);

type UserDbType = InferSchemaType<typeof userSchema>;

export const convertUserToDto = (dataFromDb: UserDbType): UserDTO => {
  return {
    username: dataFromDb.username,
    email: dataFromDb.email,
  } satisfies UserDTO;
};

export default User;
