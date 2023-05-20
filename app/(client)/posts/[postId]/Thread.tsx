"use client";
import SinglePost from "../SinglePost";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { User } from "@prisma/client";
import { PostWithUser } from "@/app/types";

interface ThreadProps {
  post: PostWithUser
  currentUser?: User | null;
}
const Thread: React.FC<ThreadProps> = ({
  post,
  currentUser
}) => {
  return (
    <div className="flex-col px-20 sm:w-full md:w-3/5">
      <div className="top-3" />
      <div className="flex">
        <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-blue-600 to-pink-600 bg-clip-text text-transparent">Thread</p>
      </div>
      <SinglePost
        userId={post.userId}
        id={post.id}
        name={post.user.name}
        avatar={post.user.image}
        createdAt={post.createdAt.toString()}
        title={post.title}
        hearts={post.hearts}
        comments={post.comments}
      />
      <AddComment postId={post.id} currentUser={currentUser} />
      {post.comments?.map((comment) => (
        <Comment
          currentUser={currentUser}
          key={comment.id}
          userId={comment.userId}
          id={comment.id}
          name={comment.user.name}
          avatar={comment.user.image}
          createdAt={comment.createdAt.toISOString()}
          title={comment.title}
        />
      ))}
    </div>
  );
}

export default Thread;