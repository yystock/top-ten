"use client";
import SinglePost from "./SinglePost";
import { ExtendedPost } from "@/types/db";
import { User } from "next-auth";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { PAGINATION_RESULT } from "@/config/config";
import { Loader2 } from "lucide-react";

interface FeedProps {
  firstPosts: ExtendedPost[];
  currentUser?: User;
  star?: string;
}
const Feed: React.FC<FeedProps> = ({ firstPosts, currentUser, star }) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query = `/api/posts?limit=${PAGINATION_RESULT}&page=${pageParam}` + (!!star ? `&star=${star}` : "");

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },

    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [firstPosts], pageParams: [1] },
    }
  );
  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage(); // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? firstPosts;
  return (
    <main>
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <SinglePost key={post.id} post={post} currentUser={currentUser} />
            </li>
          );
        } else {
          return <SinglePost key={post.id} post={post} currentUser={currentUser} />;
        }
      })}
      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        </li>
      )}
    </main>
  );
};

export default Feed;
