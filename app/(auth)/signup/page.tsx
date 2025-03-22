import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="bg-[#050e1d] flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
