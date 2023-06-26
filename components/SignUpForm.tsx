"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userRegisterValidator } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { toast } from "react-hot-toast";
import { Loader, Twitter } from "lucide-react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userRegisterValidator>;

export default function SignUpForm({ className, ...props }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterValidator),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    axios
      .post("/api/email/activate", data)
      .then(() => {
        setIsLoading(false);

        router.push("/");
      })

      .catch((error) => {
        console.log("waaaaa", error);
        toast.error(error);
      });

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6 pt-4", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5">
          <div className="grid gap-5">
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
              Name
            </label>
            <Input id="username" placeholder="Username" disabled={isLoading} {...register("username")} />

            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <Input id="password" placeholder="password" type="password" disabled={isLoading} {...register("password")} />
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
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
      <div className="mx-auto flex items-center gap-8">
        <button
          type="button"
          onClick={() => {
            setIsGoogleLoading(true);
            signIn("google");
          }}
          disabled={isLoading || isGoogleLoading}
        >
          {isGoogleLoading ? <Loader size={24} className="animate-spin" /> : <FcGoogle size={24} />}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsGoogleLoading(true);
            signIn("twitter");
          }}
          disabled={isLoading || isGoogleLoading}
        >
          {isGoogleLoading ? <Loader size={24} className="animate-spin" /> : <Twitter color="#1DA1F2" size={24} />}
        </button>
      </div>
    </div>
  );
}
