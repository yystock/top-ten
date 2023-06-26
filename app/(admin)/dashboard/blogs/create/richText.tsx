"use client";
import ReactQuill from "react-quill";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/inputs/Input";
import ImageUpload from "@/components/inputs/ImageUpload";

const RichTextEditor = () => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video", "code-block"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
  ];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      slug: "",
      category: "",
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
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/blogs", { content: content, data: data })
      .then(() => {
        toast.success("Blog created!");
        reset();
        setContent("");
      })
      .catch(() => {
        toast.error("Error creating blog.");
      });
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
        <Input id="category" label="Category" disabled={isLoading} register={register} errors={errors} required />
        <Input id="slug" label="Slug" disabled={isLoading} register={register} errors={errors} required />
        <ImageUpload onChange={(value) => setCustomValue("imageSrc", value)} value={imageSrc} />
      </div>

      <ReactQuill id="content" modules={modules} formats={formats} theme="snow" value={content} onChange={setContent} />
      <Button>Save</Button>
    </form>
  );
};

export default RichTextEditor;
