"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { login } from "@/app/(auth)/actions";
import { useActionState, useEffect } from "react";

const initialState = {
  errors: {
    email: [],
    password: [],
  },
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [state, loginAction] = useActionState(login, initialState);
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/jobs");
    }
  }, [state?.success, router]);

  return (
    <div
      className={cn("flex flex-col gap-6 bg-[#0a1729] rounded-xl", className)}
      {...props}
    >
      <Card className="bg-[#0a1729] border-[#1a2b4b]">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
              {state?.errors?.email && (
                <p className="text-sm text-red-500">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
              {state?.errors?.password && (
                <p className="text-sm text-red-500">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            {state?.errors?.general && (
              <p className="text-sm text-red-500">{state.errors.general[0]}</p>
            )}

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <div className="text-gray-500 text-center text-xs px-3 pb-6">
          By clicking continue, you agree to our{" "}
          <a
            href="#"
            className="text-gray-400 underline underline-offset-4 hover:text-white"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-gray-400 underline underline-offset-4 hover:text-white"
          >
            Privacy Policy
          </a>
          .
        </div>
      </Card>
    </div>
  );
}
