"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import useStarModal from "@/app/hooks/useStarModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import ImageUpload from "../inputs/ImageUpload";


const StarModal = () => {
  const router = useRouter();
  const starModal = useStarModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      vote: 1,
      imageSrc: "",
    },
  });
  const imageSrc = watch("imageSrc");
  

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data)

    axios.post("/api/stars", data)
    .then(() => {
        setIsLoading(false);
        toast.success("Logged in");
        router.refresh();
        starModal.onClose();
    }).catch(() => {
        toast.error("Error creating star.");
    }).finally(() => {
        setIsLoading(false);
    })
  };


  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Star to your account!" />

      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
      <ImageUpload onChange={(value) => setCustomValue("imageSrc", value)} value={imageSrc} />
      <Input id="vote" label="Vote" disabled={isLoading} register={register} errors={errors} required />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={starModal.isOpen}
      title="Star"
      actionLabel="Continue"
      onClose={starModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default StarModal;
