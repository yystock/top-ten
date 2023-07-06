"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userLoginValidator } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { BsGoogle } from "react-icons/bs";

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userLoginValidator>;

export default function SignInForm({ className, ...props }: SignInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userLoginValidator),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast.error("Your sign in request failed. Please try again.");
    }

    return toast.success("Check your email, We sent you a login link. Be sure to check your spam too.");
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register("email")}
            />
            {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}

            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <Input id="password" placeholder="Password" type="password" disabled={isLoading} {...register("password")} />
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true);
          signIn("google");
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <BsGoogle className="mr-2 h-4 w-4" />} Google
      </button>
    </div>
  );
}
