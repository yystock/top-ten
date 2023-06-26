import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};
const SignupSuccessPage = () => {
  return (
    <div className="container mx-auto flex h-fit flex-col items-center">
      <Send size={50} color="green" className="mt-5"></Send>
      <h1>Verify your email!</h1>
      <p className="mt-5">Verification email has been sent. Check your email to get started</p>
      <Link href="/" className={cn("mt-24", buttonVariants({ variant: "default" }))}>
        Back to Login
      </Link>
    </div>
  );
};

export default SignupSuccessPage;
