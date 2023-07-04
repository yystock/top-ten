"use client";

import { FC, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Input } from "./ui/Input";
import { Heading } from "./Heading";
import ImageUpload from "./inputs/ImageUpload";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { UserSchema, UserValidator } from "@/lib/validations/user";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

interface UserFormProps {
  user?: Pick<User, "id" | "username" | "image" | "role">;
}

const UserForm: FC<UserFormProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const action = user ? "Save changes" : "Create";
  const blankProfilePic = "https://res.cloudinary.com/ddlghc5ff/image/upload/v1687966308/placeholder_djxjbl.jpg";

  const defaultValues = user
    ? {
        ...user,
      }
    : {};

  const form = useForm<UserSchema>({
    resolver: zodResolver(UserValidator),
    defaultValues,
  });

  const onSubmit = async (data: UserSchema) => {
    setIsLoading(true);

    if (user) {
      axios
        .patch(`/api/users/${user.id}`, data)
        .then(() => {
          router.push("/dashboard/users");
          toast.success("User has been updated succesfully");
        })
        .catch(() => {
          toast.error("Error updating user.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post("/api/users", data)
        .then(() => {
          router.push("/dashboard/users");
          toast.success("User has been edited succesfully");
        })
        .catch(() => {
          toast.error("Error editing user.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <Heading title="Edit user" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <FormField
            control={form.control}
            name="image"
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
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Role" {...field} />
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

export default UserForm;
