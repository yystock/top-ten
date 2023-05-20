"use client";
import Avatar from "@/app/components/Avatar";
import { formatDate } from "@/app/libs/utils";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteIcon = ({ onClick }: { onClick: Function }) => {
  const [hover, setHover] = useState(false);
  return (
    <svg
      style={{ marginLeft: "auto", cursor: "pointer" }}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => onClick()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.2871 5.24297C20.6761 5.24297 21 5.56596 21 5.97696V6.35696C21 6.75795 20.6761 7.09095 20.2871 7.09095H3.71385C3.32386 7.09095 3 6.75795 3 6.35696V5.97696C3 5.56596 3.32386 5.24297 3.71385 5.24297H6.62957C7.22185 5.24297 7.7373 4.82197 7.87054 4.22798L8.02323 3.54598C8.26054 2.61699 9.0415 2 9.93527 2H14.0647C14.9488 2 15.7385 2.61699 15.967 3.49699L16.1304 4.22698C16.2627 4.82197 16.7781 5.24297 17.3714 5.24297H20.2871ZM18.8058 19.134C19.1102 16.2971 19.6432 9.55712 19.6432 9.48913C19.6626 9.28313 19.5955 9.08813 19.4623 8.93113C19.3193 8.78413 19.1384 8.69713 18.9391 8.69713H5.06852C4.86818 8.69713 4.67756 8.78413 4.54529 8.93113C4.41108 9.08813 4.34494 9.28313 4.35467 9.48913C4.35646 9.50162 4.37558 9.73903 4.40755 10.1359C4.54958 11.8992 4.94517 16.8102 5.20079 19.134C5.38168 20.846 6.50498 21.922 8.13206 21.961C9.38763 21.99 10.6811 22 12.0038 22C13.2496 22 14.5149 21.99 15.8094 21.961C17.4929 21.932 18.6152 20.875 18.8058 19.134Z"
        fill="#200E32"
        stroke={hover ? "#F31260" : "#9ba1a6"}
      />
    </svg>
  );
};

export default function Comment({
  userId,
  id,
  name,
  avatar,
  createdAt,
  title,
  currentUser
}: {
  userId: string;
  id: string;
  name: string | null;
  avatar: string | null;
  createdAt: string;
  title: string;
  currentUser?: User | null;
}) {

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
      <div className="mt-4 pl-4 py-3 pr-2 rounded-xl dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700">
        <div className="flex justify-start items-center">
          <Avatar src={avatar} height={40} width={40} bordered={userId === currentUser?.id} />
          <span className="w-3" />
          <div className="pl-1.5">
            <div>
              <p className="font-bold text-black dark:text-slate-200">{name}</p>
            </div>
            <div>
              <p className="text-slate-400">{formatDate(createdAt)}</p>
            </div>
          </div>
        </div>
        <div className="py-5 px-2 flex-wrap h-auto text-left">
          <p className="break-words">{title}</p>
        </div>
        {userId === currentUser?.id && (
          <div>
            <DeleteIcon onClick={handler} />
          </div>
        )}
      </div>
      <span />

      {visible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-slate-800 opacity-75"></div>
          <div className="bg-slate-100 dark:bg-slate-700 p-1 border-2 rounded-lg z-10">
            {/* Modal content */}
            <div className="px-4 pt-4">
              <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            </div>

            <div className="flex px-4 pb-2 gap-10 border-t-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={closeHandler}>
                Close
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={() => deleteComment(id)}>
                {deleteLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
}