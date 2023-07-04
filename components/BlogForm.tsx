"use client";

import * as React from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Blog } from "@prisma/client";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import "@/styles/editor.css";
import { Input } from "./ui/Input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import ImageUpload from "./inputs/ImageUpload";
import { BlogSchema, BlogValidator } from "@/lib/validations/blog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

interface BlogFormProps {
  blog?: Blog;
}

export function BlogForm({ blog }: BlogFormProps) {
  const action = blog ? "Save changes" : "Create";
  const blankProfilePic = "https://res.cloudinary.com/ddlghc5ff/image/upload/v1687966308/placeholder_djxjbl.jpg";

  const defaultValues = blog
    ? {
        ...blog,
      }
    : {
        slug: "",
        title: "",
        imgSrc: blankProfilePic,
        star: "",
        content: "",
        category: "",
        published: false,
      };

  const form = useForm<BlogSchema>({
    resolver: zodResolver(BlogValidator),
    defaultValues,
  });

  const ref = React.useRef<EditorJS>();
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const Image = (await import("@editorjs/image")).default;

    const body = blog ? BlogValidator.parse(blog) : null;

    const uploadPreset = "wnzax6of";
    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: body?.content,
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByFile(file: File) {
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", "wnzax6of");
                  return fetch("https://api.cloudinary.com/v1_1/ddlghc5ff/image/upload", {
                    method: "POST",
                    body: formData,
                  })
                    .then((response) => response.json())
                    .then((data) => ({
                      success: 1,
                      file: {
                        url: data.secure_url, // Use the secure_url property from the Cloudinary response
                      },
                    }));
                },
              },
            },
          },
        },
      });
    }
  }, [blog]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: BlogSchema) {
    setIsSaving(true);

    const blocks = await ref.current?.save();

    if (!blog) {
      axios
        .post(`/api/blogs/`, { ...data, content: blocks })
        .then(() => {
          router.push("/dashboard/blogs");
          toast.success("Blog has been created succesfully");
        })
        .catch(() => {
          toast.error("Error creating blog.");
        })
        .finally(() => {
          setIsSaving(false);
        });
    } else {
      axios
        .patch(`/api/blogs/${blog.id}`, { ...data, content: blocks })
        .then(() => {
          router.push("/dashboard/blogs");
          toast.success("Blog has been created succesfully");
        })
        .catch(() => {
          toast.error("Error creating blog.");
        })
        .finally(() => {
          setIsSaving(false);
        });
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <FormField
            control={form.control}
            name="imgSrc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    disabled={isSaving}
                    onChange={(url) => field.onChange(url)}
                    onRemove={(url) => field.onChange(blankProfilePic)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={isSaving} placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input disabled={isSaving} placeholder="Category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input disabled={isSaving} placeholder="Slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="prose prose-stone dark:prose-invert mx-auto w-[800px] text-foreground">
            <div id="editor" className="min-h-[500px] border-2 bg-accent text-foreground" />
            <p className="text-sm text-foreground">
              Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open the command menu.
            </p>
          </div>

          <Button isLoading={isSaving} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
