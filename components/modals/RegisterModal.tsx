"use client";

import axios from "axios";
import { signIn } from "next-auth/react";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import { Button } from "../ui/Button";

import { Twitter } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";
import { userRegisterValidator } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  type FormData = z.infer<typeof userRegisterValidator>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterValidator),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/email/activate", data)
      .then(() => {
        setIsLoading(false);

        reset();
        registerModal.onClose();
        router.push("/sign-up/success");
      })

      .catch((error) => {
        setIsLoading(false);
        if (error.response.status == 409) {
          toast.error("User Already existed!");
        }
        if (error.response.status == 422) {
          toast.error("Incorrect Input Type");
        }
        if (error.response.status == 500) {
          toast.error("Server Issues, try a unique username");
        }
      });
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-8 pt-4">
      <Heading title="Welcome to New Media" subtitle="Create an account!" />
      <div className="flex flex-col gap-5 px-3">
        <Input id="email" label="Email" disabled={isLoading} register={{ ...register("email") }} errors={errors} required />
        <Input id="username" label="Username" disabled={isLoading} register={{ ...register("username") }} errors={errors} required />
        <Input id="password" label="Password" type="password" disabled={isLoading} register={{ ...register("password") }} errors={errors} required />
      </div>
    </div>
  );

  const footerContent = (
    <div className="mt-2 gap-5">
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
          mt-4
          text-center 
          font-light
          text-foreground
        "
      >
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="
              cursor-pointer
              font-semibold
              text-foreground
              hover:underline
            "
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
