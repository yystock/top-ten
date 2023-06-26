"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Blog } from "@prisma/client";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { postPatchSchema } from "@/lib/validations/post";
import { buttonVariants } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { BsArrowLeftShort } from "react-icons/bs";
import { BiLoader } from "react-icons/bi";
import ImageUpload from "./inputs/ImageUpload";

interface EditorProps {
  blog?: Pick<Blog, "id" | "title" | "content" | "published" | "slug" | "category" | "imgSrc">;
}

type FormData = z.infer<typeof postPatchSchema>;

export function Editor({ blog }: EditorProps) {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  });
  const ref = React.useRef<EditorJS>();
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const imageSrc = watch("imgSrc");

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

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

    const body = blog ? postPatchSchema.parse(blog) : null;
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
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByFile(file) {
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

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const blocks = await ref.current?.save();

    if (!blog) {
      const response = await fetch(`/api/blogs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          imgSrc: data.imgSrc,
          category: data.category,
          slug: data.slug,
          content: blocks,
        }),
      });
      setIsSaving(false);

      if (!response?.ok) {
        return toast.error("Your post was not saved. Please try again");
      }

      router.refresh();

      return toast.success("Your post has been saved.");
    } else {
      const response = await fetch(`/api/blogs/${blog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          imgSrc: data.imgSrc,
          category: data.category,
          slug: data.slug,
          content: blocks,
        }),
      });
      setIsSaving(false);

      if (!response?.ok) {
        return toast.error("Your post was not saved. Please try again");
      }

      router.refresh();

      return toast.success("Your post has been saved.");
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link href="/dashboard" className={cn(buttonVariants({ variant: "ghost" }))}>
              <>
                <BsArrowLeftShort className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            <p className="text-sm text-muted-foreground">{blog?.published ? "Published" : "Draft"}</p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && <BiLoader className="mr-2 h-4 w-4 animate-spin" />}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone dark:prose-invert mx-auto w-[800px]">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={blog?.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
          <TextareaAutosize
            autoFocus
            id="slug"
            defaultValue={blog?.slug}
            placeholder="Post slug"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("slug")}
          />
          <TextareaAutosize
            autoFocus
            id="category"
            defaultValue={blog?.category}
            placeholder="Post category"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("category")}
          />
          <ImageUpload onChange={(value) => setCustomValue("imgSrc", value)} value={imageSrc} />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open the command menu.
          </p>
        </div>
      </div>
    </form>
  );
}
