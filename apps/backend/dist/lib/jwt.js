import jwt from "jsonwebtoken";
import { env } from "../lib/env";
export function signJwt(payload, expiresIn = "7d") {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}
export function verifyJwt(token) {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    }
    catch (e) {
        return null;
    }
}
