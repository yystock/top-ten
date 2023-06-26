"use client";

import { formatDate } from "@/lib/utils";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { FC, useState } from "react";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import axios from "axios";
import toast from "react-hot-toast";
import { User } from "next-auth";
import { ExtendedPost } from "@/types/db";
import { Heart, Trash2 } from "lucide-react";

interface SinglePost {
  post: ExtendedPost;
  currentUser?: User;
}

const SinglePost: FC<SinglePost> = ({ post, currentUser }) => {
  const currentUserLiked = (currentUser && post.hearts?.some((like) => like.userId === currentUser?.id)) || false;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const segment = useSelectedLayoutSegment();

  const closeHandler = () => {
    setVisible(false);
  };

  const addLike = async (id: string) => {
    setLoading(true);

    axios
      .post("/api/hearts", { postId: id })
      .then(() => {
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deletePost = async (postId: string) => {
    setDeleteLoading(true);
    axios
      .delete(`/api/posts/${postId}`)
      .then(() => {
        toast.success("Post Deleted");
        router.refresh();
        // closeHandler();
        // segment === "posts" ? router.refresh() : router.push("/posts"); // if on posts page, refresh, else redirect to posts page
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  return (
    <>
      <div className="mt-5 rounded-xl border-2 py-3 pl-4 pr-2">
        <div className="flex items-center justify-start">
          {post.user.image && <Avatar src={post.user.image} height={40} width={40} />}
          <span className="w-3" />
          <div className="flex flex-wrap pl-1.5 ">
            <div className="w-full">
              <b className="text-black dark:text-slate-200">{post.user.name}</b>
            </div>
            <div className="w-full">
              <p className="text-slate-400">{formatDate(post.createdAt.toISOString())}</p>
            </div>
          </div>
        </div>
        <div className="h-auto flex-wrap py-5 px-3 text-left">
          <p className="break-words">{post.title}</p>
        </div>
        <div className="mt-1.5 flex items-center justify-start">
          <Link href={`/posts/${post.id}`}>
            <p className="text-slate-400">
              {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
            </p>
          </Link>
          <span className="w-2" />
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
            <Heart fill={currentUserLiked ? "red" : "none"} onClick={() => currentUser && addLike(post.id)} />
          )}
          <span className="w-1" />
          <p className={`${currentUserLiked ? "text-red-500" : "text-slate-400"}`}>{post.hearts.length}</p>
          {post.user.id === currentUser?.id && <Trash2 onClick={handler} />}
        </div>
      </div>
      <span className="h-1" />

      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-slate-800 opacity-75"></div>
          <div className="z-10 rounded-lg border-2 bg-slate-100 p-1 dark:bg-slate-700">
            {/* Modal content */}
            <div className="px-4 pt-4">
              <h2 className="mb-4 text-xl font-bold">Are you sure?</h2>
            </div>

            <div className="flex gap-10 border-t-4 px-4 pb-2">
              <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white" onClick={closeHandler}>
                Close
              </button>
              <button className="mt-4 rounded bg-red-500 px-4 py-2 text-white" onClick={() => deletePost(post.id)}>
                {deleteLoading ? (
                  <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePost;
