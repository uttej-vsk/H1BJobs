"use server";

import { redirect } from "next/navigation";
import {
  deleteSession,
  hashPassword,
  verifyPassword,
  createSession,
  decrypt,
} from "./lib/session";
import { createUser, getUserByEmail } from "@/lib/db";
import { cookies } from "next/headers";

export async function login(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return {
        errors: {
          email: !email ? ["Email is required"] : [],
          password: !password ? ["Password is required"] : [],
        },
      };
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return { errors: { email: ["User not found"] } };
    }

    const isPasswordValid = await verifyPassword(
      password as string,
      user.password,
      user.salt
    );
    console.log("isPasswordValid", isPasswordValid);
    if (!isPasswordValid) {
      return { errors: { password: ["Invalid password"] } };
    }

    await createSession(user._id.toString());
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { errors: { general: ["An unexpected error occurred"] } };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/");
}

export async function signup(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const firstName = formData.get("firstName")?.toString();

    if (!email || !password || !firstName) {
      return {
        errors: {
          email: !email ? ["Email is required"] : [],
          password: !password ? ["Password is required"] : [],
          firstName: !firstName ? ["First name is required"] : [],
        },
      };
    }

    const { hash, salt } = await hashPassword(password);
    const newUser = { email, password: hash, salt, firstName };
    console.log("newUser", newUser);

    const result = await createUser(newUser);
    console.log("result", result);

    await createSession(result.insertedId.toString());
    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    return { errors: { general: ["An unexpected error occurred"] } };
  }
}

export async function checkAuth() {
  try {
    const session = (await cookies()).get("session")?.value;
    if (!session) return { isAuthenticated: false };

    const decrypted = await decrypt(session);
    return { isAuthenticated: !!decrypted?.userId };
  } catch (error) {
    console.error("Auth check error:", error);
    return { isAuthenticated: false };
  }
}
