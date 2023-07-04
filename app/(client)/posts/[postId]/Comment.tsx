"use client";
import Avatar from "@/components/Avatar";
import { formatTimeToNow } from "@/lib/utils";

import { User } from "next-auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { ExtendedComment } from "@/types/db";

interface CommentProps {
  comment: ExtendedComment;
  currentUser?: User;
}
const Comment: FC<CommentProps> = ({ currentUser, comment }) => {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const deleteComment = async (commentId: string) => {
    setDeleteLoading(true);
    axios
      .delete(`/api/comments/${commentId}`)
      .then(() => {
        toast.success("Comment Deleted");
        closeHandler();
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
      <div className="mt-4 rounded-xl border-2 border-slate-300 py-3 pl-4 pr-2 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-start">
          <Avatar src={comment.userId} height={40} width={40} bordered={comment.userId === currentUser?.id} />
          <span className="w-3" />
          <div className="pl-1.5">
            <div>
              <p className="font-bold text-black dark:text-slate-200">{comment.user.name}</p>
            </div>
            <div>
              <p className="text-slate-400">{formatTimeToNow(new Date(comment.createdAt))}</p>
            </div>
          </div>
        </div>
        <div className="h-auto flex-wrap px-2 py-5 text-left">
          <p className="break-words">{comment.title}</p>
        </div>
        {comment.userId === currentUser?.id && (
          <div>
            <Trash2 onClick={handler} />
          </div>
        )}
      </div>
      <span />

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
              <button className="mt-4 rounded bg-red-500 px-4 py-2 text-white" onClick={() => deleteComment(comment.id)}>
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

export default Comment;
