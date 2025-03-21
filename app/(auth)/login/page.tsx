import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-black/80 inset-0 z-[101] flex min-h-dvh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
