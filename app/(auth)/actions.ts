import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./lib/session";

const testUser = {
  id: "user123",
  email: "test@example.com",
  password: "password123",
};

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password);
  console.log(prevState);

  if (!email || !password) {
    return {
      errors: {
        email: !email ? ["Email is required"] : [],
        password: !password ? ["Password is required"] : [],
      },
    };
  }

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(testUser.id);
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
