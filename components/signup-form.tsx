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
import { useActionState } from "react";
import { signup } from "@/app/(auth)/actions";
import { useFormStatus } from "react-dom";

const initialState = {
  errors: {
    email: [],
    password: [],
    firstName: [],
  },
};

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [state, signupAction] = useActionState(signup, initialState);
  const { pending } = useFormStatus();

  return (
    <div
      className={cn("flex flex-col gap-6 bg-[#0a1729] rounded-xl", className)}
      {...props}
    >
      <Card className="bg-[#0a1729] border-[#1a2b4b]">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">
            Create an account
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signupAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@doe.com"
                  required
                  className="rounded-lg bg-[#071428] border-[#1a2b4b] text-white placeholder:text-gray-500"
                />
              </div>
              {state?.errors?.email && (
                <p className="text-sm text-red-500">{state.errors.email[0]}</p>
              )}
              <div className="grid gap-2">
                <Label htmlFor="firstName" className="text-white">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  required
                  className="rounded-lg bg-[#071428] border-[#1a2b4b] text-white placeholder:text-gray-500"
                />
              </div>
              {state?.errors?.firstName && (
                <p className="text-sm text-red-500">
                  {state.errors.firstName[0]}
                </p>
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm text-gray-400 underline-offset-4 hover:text-white hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="rounded-lg bg-[#071428] border-[#1a2b4b] text-white"
                />
              </div>
              {state?.errors?.password && (
                <p className="text-sm text-red-500">
                  {state.errors.password[0]}
                </p>
              )}
              <Button
                type="submit"
                className="w-full rounded-lg bg-white text-[#050e1d] hover:bg-gray-200"
                disabled={pending}
              >
                Sign up
              </Button>
              <div className="flex items-center gap-4">
                <div className="h-[1px] bg-[#1a2b4b] flex-grow"></div>
                <span className="text-sm text-gray-400">Or</span>
                <div className="h-[1px] bg-[#1a2b4b] flex-grow"></div>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-lg border-[#1a2b4b] text-white hover:bg-[#1a2b4b]"
              >
                Sign up with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-white underline underline-offset-4 hover:text-gray-200"
              >
                Login
              </a>
            </div>
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
