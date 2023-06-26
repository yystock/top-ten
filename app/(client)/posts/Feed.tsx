"use client";
import AddPost from "./AddPost";
import SinglePost from "./SinglePost";
import { ExtendedPost } from "@/types/db";
import { User } from "next-auth";
interface FeedProps {
  data?: ExtendedPost[];
  currentUser?: User;
}
const Feed: React.FC<FeedProps> = ({ data, currentUser }) => {
  return (
    <main>
      <div className="items-center px-20">
        <span className="h-0.5" />
        <div className="my-5 flex">
          <h1 className="bg-gradient-to-r from-blue-500 via-blue-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">Feed</h1>
        </div>
        <div className="mb-7 pt-0.5">
          <AddPost currentUser={currentUser} />
        </div>

        {data?.map((post) => (
          <SinglePost key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
    </main>
  );
};

export default Feed;
