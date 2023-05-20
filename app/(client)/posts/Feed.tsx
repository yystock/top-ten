"use client";
import AddPost from "./AddPost";
import SinglePost from "./SinglePost";
import { PostType } from "../../types";

import { User } from "@prisma/client";
interface FeedProps {
  data: PostType[],
  currentUser?: User | null;
}
const Feed: React.FC<FeedProps> = ({
  data,
  currentUser
}) => {
  return (
    <main>
      <div className="px-20 items-center">
        <span className="h-0.5" />
        <div className="flex my-5">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Feed
          </h1>
        </div>
        <div className="pt-0.5 mb-7">
          <AddPost currentUser={currentUser}/>
        </div>

        {data?.map((post) => (
          <SinglePost
            key={post.id}
            id={post.id}
            userId={post.user.id}
            name = {post.user.name}
            avatar={post.user.image}
            createdAt={post.createdAt}
            title={post.title}
            hearts={post.hearts}
            comments={post.comments}
            currentUser = {currentUser}
          />
        ))}
      </div>
    </main>
  );
}

export default Feed;