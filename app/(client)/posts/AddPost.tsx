"use client";

import { Button } from "@/components/ui/Button";
import axios from "axios";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface AddPostProps {
  currentUser?: User;
}
const AddPost: React.FC<AddPostProps> = ({ currentUser }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (content.length < 1) {
      setLoading(false);
      toast.error("Post cannot be empty.");
    } else {
      axios
        .post("/api/posts", { title: content })
        .then(() => {
          toast.success("Post created!");
          setContent("");
          router.refresh();
        })
        .catch(() => {
          toast.error("Error creating post.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>{currentUser ? "  Write your thoughts:" : "Please sign in to post."}</label>
        <div className="mt-2">
          <textarea
            className=" 
          h-24 
          w-full 
          rounded-2xl
          border-2
          bg-background
          px-3
          py-1
          disabled:cursor-not-allowed"
            disabled={!currentUser}
            placeholder={currentUser ? "Enter your amazing ideas..." : ""}
            value={content}
            maxLength={300}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-1 flex items-center">
        <Button
          type="submit"
          disabled={!currentUser}
          isLoading={loading}
          className={`
            min-w-[100px]
            items-center
            justify-center
            rounded-xl
            border-2
            ${currentUser ? "bg-blue-600" : "bg-slate-200"}      
      
          `}
        >
          Post
        </Button>

        <p className="ml-auto">{content.length}/300</p>
      </div>

      <span className="h-2" />
    </form>
  );
};

export default AddPost;
