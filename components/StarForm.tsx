"use client";

import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Star } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import { Input } from "./ui/Input";
import { Heading } from "./Heading";
import ImageUpload from "./inputs/ImageUpload";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { StarSchema, StarValidator } from "@/lib/validations/star";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Separator } from "./ui/separator";

interface StarFormProps {
  star?: Star;
}

const StarForm: FC<StarFormProps> = ({ star }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const action = star ? "Save changes" : "Create";
  const blankProfilePic = "https://res.cloudinary.com/ddlghc5ff/image/upload/v1687966308/placeholder_djxjbl.jpg";

  const defaultValues = star
    ? {
        ...star,
      }
    : {
        name: "",
        picture: blankProfilePic,
        vote: 0,
      };

  const form = useForm<StarSchema>({
    resolver: zodResolver(StarValidator),
    defaultValues,
  });

  const onSubmit = async (data: StarSchema) => {
    setIsLoading(true);
    console.log(data.picture);

    if (star) {
      axios
        .patch(`/api/stars/${star.id}`, data)
        .then(() => {
          router.push("/dashboard/stars");
          toast.success("Star has been updated succesfully");
        })
        .catch(() => {
          toast.error("Error updating star.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post("/api/stars", data)
        .then(() => {
          router.push("/dashboard/stars");
          toast.success("Star has been updated succesfully");
        })
        .catch(() => {
          toast.error("Error creating star.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <Heading title="Create/Modify Star" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    disabled={isLoading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={(url) => field.onChange(blankProfilePic)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vote</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Vote" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button isLoading={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StarForm;
