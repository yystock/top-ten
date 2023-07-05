import React from "react";
import BlogList from "./BlogList";
import getBlogs from "@/app/actions/getBlogs";
import Link from "next/link";

async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div>
      {blogs && (
        <div className="container">
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
            <div className="flex-1 space-y-4">
              <h1 className="font-heading inline-block text-4xl tracking-tight lg:text-5xl">Blog</h1>
              <p className="text-xl text-muted-foreground">Top Articles about XXX</p>
            </div>
          </div>

          <div
            className="
            grid
            grid-cols-1 
            gap-8 
            pt-24 
            sm:grid-cols-1 
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            2xl:grid-cols-5"
          >
            {blogs.map((blog) => (
              <BlogList key={blog.id} blog={blog} aspect="square" />
            ))}
          </div>
          <div className="mt-10 flex justify-center"></div>
        </div>
      )}
    </div>
  );
}

export default Blogs;
