"use client";

import useCountdown from "@/app/hooks/useCountdown";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { MailCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FC, useEffect, useState } from "react";

interface ActivateVerificationProps {
  email: string | null;
  password: string | null;
}

const ActivateVerification: FC<ActivateVerificationProps> = ({ email, password }) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const { timer, startCountdown, stopCountdown } = useCountdown(10);

  const router = useRouter();
  useEffect(() => {
    signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    }).then((callback) => {
      setLoading(false);
      if (callback?.ok) {
        setSuccess(true);
        startCountdown();
        setTimeout(() => {
          stopCountdown();
          router.push("/");
        }, 10000);
      }
      if (callback?.error) {
        setSuccess(false);
      }
    });
  }, []);

  return (
    <div className="container mx-auto flex h-fit flex-col items-center">
      {loading ? (
        <div>Loading</div>
      ) : success ? (
        <>
          <MailCheck size={50} color="green" className="mt-5"></MailCheck>
          <h1>You are Verified!</h1>
          <p className="mt-5">{timer}</p>
          <Link href="/" className={cn("mt-24", buttonVariants({ variant: "default" }))}>
            Back to HomePage
          </Link>
        </>
      ) : (
        <div>Server Error!</div>
      )}
    </div>
  );
};

export default ActivateVerification;
