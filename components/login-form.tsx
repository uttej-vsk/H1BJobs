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
import { useActionState, useEffect } from "react";
import { login } from "@/app/(auth)/actions";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [state, loginAction] = useActionState(login, undefined);
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/");
    }
  }, [state?.success, router]);

  return (
    <div
      className={cn("flex flex-col gap-6 bg-white rounded-xl", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@doe.com"
                  required
                  className="rounded-lg border-gray-300"
                />
              </div>
              {state?.errors?.email && (
                <p className="text-sm text-red-500">{state.errors.email[0]}</p>
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="rounded-lg border-gray-300"
                />
              </div>
              {state?.errors?.password && (
                <p className="text-sm text-red-500">
                  {state.errors.password[0]}
                </p>
              )}
              <Button
                type="submit"
                className="w-full rounded-lg "
                disabled={pending}
                variant="black"
              >
                Login
              </Button>
              <div className="flex items-center gap-4">
                <div className="h-[1px] bg-gray-300 flex-grow"></div>
                <span className="text-sm text-gray-500">Or</span>
                <div className="h-[1px] bg-gray-300 flex-grow"></div>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-lg border-gray-300"
              >
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
        <div className="text-muted-foreground *:[a]:hover:text-secondary text-center text-xs *:[a]:underline *:[a]:underline-offset-4 px-3">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </Card>
    </div>
  );
}
