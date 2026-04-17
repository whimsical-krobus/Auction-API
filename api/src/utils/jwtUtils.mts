import jwt from "jsonwebtoken";
import type { UserDTO } from "../models/userDto.mjs";

export function extractUserFromToken(token: string): UserDTO | null {
    try {
        return jwt.decode(token) as UserDTO;
    } catch (error) {
        return null;
    }
}