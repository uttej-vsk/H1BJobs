"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
import crypto from "crypto";

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");

  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");

  return { hash, salt, password };
}

export async function verifyPassword(
  password: string,
  hash: string,
  salt: string
) {
  const checkHash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");

  return checkHash === hash;
}
