"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { User } from "next-auth";
import axios from "axios";

interface AddCommentProps {
  postId: string;
  currentUser?: User;
}
export default function AddComment({ postId, currentUser }: AddCommentProps): JSX.Element {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (content.length < 1) {
      setLoading(false);
      toast.error("Comment cannot be empty.");
    } else {
      axios
        .post("/api/comments", { title: content, postId: postId })
        .then(() => {
          toast.success("Comment created!");
          setContent("");
          router.refresh();
        })
        .catch(() => {
          toast.error("Error creating comment.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-5 w-full">
      <span className="t-10" />
      <textarea
        className=" 
          h-15 
          w-full 
          rounded-2xl 
        border-2
        px-3
          py-1
          hover:border-black
          disabled:cursor-not-allowed
          hover:dark:border-slate-100"
        disabled={!currentUser}
        placeholder={currentUser ? "Comment here..." : "Please sign in to comment."}
        value={content}
        maxLength={300}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="mt-1 flex items-center justify-between">
        <button
          type="submit"
          disabled={!currentUser}
          className={`
                relative
                flex
                h-10
                min-w-[100px]
                items-center
                justify-center
                rounded-xl
                border-2
              text-white
                ${currentUser ? "bg-blue-600" : "bg-slate-200"}     
            `}
        >
          {loading ? (
            <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Comment"
          )}
        </button>

        <p>{content.length}/300</p>
      </div>
      <span className="h-3" />
    </form>
  );
}
