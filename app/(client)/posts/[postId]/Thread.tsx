"use client";
import SinglePost from "../SinglePost";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { User } from "next-auth";
import { ExtendedPost, SinglePostType } from "@/types/db";

interface ThreadProps {
  post: SinglePostType;
  currentUser?: User;
}
const Thread: React.FC<ThreadProps> = ({ post, currentUser }) => {
  return (
    <div className="flex-col px-20 sm:w-full md:w-3/5">
      <div className="top-3" />
      <div className="flex">
        <p className="bg-gradient-to-r from-blue-500 via-blue-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">Thread</p>
      </div>
      <SinglePost key={post.id} post={post} currentUser={currentUser} />
      <AddComment postId={post.id} currentUser={currentUser} />
      {post.comments?.map((comment) => (
        <Comment currentUser={currentUser} key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Thread;
