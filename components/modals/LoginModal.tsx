"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import { Button } from "../ui/Button";
import { Twitter } from "lucide-react";
import * as z from "zod";
import { userLoginValidator } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
type FormData = z.infer<typeof userLoginValidator>;

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userLoginValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");

        router.back();
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        reset();
        toast.error(callback.error);
      }
    });
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-8 pt-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <div className="flex flex-col gap-5 px-3">
        <Input id="email" label="Email" disabled={isLoading} register={{ ...register("email") }} errors={errors} required />
        <Input id="password" label="Password" type="password" disabled={isLoading} register={{ ...register("password") }} errors={errors} required />
      </div>
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-3">
      <div className="relative flex flex-row items-center py-5">
        <hr className="border-t-1 border-outline w-full" />
        <span className="mx-4 flex-shrink text-foreground">Or</span>
        <hr className="border-t-1 border-outline w-full" />
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button className="bg-background" onClick={() => signIn("google")}>
          <FcGoogle size={24} />
        </Button>
        <Button className="bg-background" onClick={() => signIn("twitter")}>
          <Twitter size={24} color="#1DA1F2" />
        </Button>
      </div>
      <div
        className="
       mt-4 text-center font-light"
      >
        <p>
          First time using YY?
          <span
            onClick={onToggle}
            className="
      
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
