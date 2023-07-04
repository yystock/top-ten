import Link from "next/link";
import { TbPhoto } from "react-icons/tb";
import Image from "next/image";
import { Blog } from "@prisma/client";
import { User } from "@prisma/client";

import Avatar from "@/components/Avatar";

interface BlogListProps {
  blog: Blog & { user: User };
  aspect?: string;
  minimal?: boolean;
  pathPrefix?: boolean;
  preloadImage?: boolean;
  fontSize?: string;
  fontWeight?: string;
}

const BlogList: React.FC<BlogListProps> = ({ blog, aspect, minimal = false, pathPrefix, preloadImage, fontSize, fontWeight }) => {
  return (
    <>
      <div className={`cursor-pointer", group ${minimal && "grid gap-10 md:grid-cols-2"}`}>
        <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800">
          <Link
            className={`relative block ${aspect === "landscape" ? "aspect-video" : aspect === "custom" ? "aspect-[5/4]" : "aspect-square"}`}
            href={`/blogs/${pathPrefix ? `${pathPrefix}/` : ""}${blog.slug}`}
          >
            {blog.imgSrc ? (
              <Image
                src={blog.imgSrc}
                {...(blog.imgSrc && {
                  placeholder: "blur",
                  blurDataURL: blog.imgSrc,
                })}
                alt={blog.imgSrc || "Thumbnail"}
                priority={preloadImage ? true : false}
                className="object-cover transition-all"
                fill
                sizes="(max-width: 768px) 30vw, 33vw"
              />
            ) : (
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                <TbPhoto />
              </span>
            )}
          </Link>
        </div>

        <div className={`${minimal && "flex items-center"}`}>
          <div>
            <div className="flex gap-3">
              <span className="trackeing-wider inline-block text-xs font-medium">{blog.category}</span>
            </div>
            <h2
              className={`
                ${fontSize === "large" ? "text-2xl" : minimal ? "text-3xl" : "text-lg"}
                ${fontWeight === "normal" ? "line-clamp-2 font-medium  tracking-normal text-black" : "font-semibold leading-snug tracking-tight"}
                "mt-2  dark:text-white"
              `}
            >
              <Link href={`/blogs/${pathPrefix ? `${pathPrefix}/` : ""}${blog.slug}`}>
                <span
                  className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
                    bg-no-repeat
                    transition-[background-size]
                    duration-500
                    hover:bg-[length:100%_3px]
                    group-hover:bg-[length:100%_10px]
                    dark:from-purple-800 dark:to-purple-900"
                >
                  {blog.title}
                </span>
              </Link>
            </h2>

            <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <div className="relative h-5 w-5 flex-shrink-0">
                  <Avatar src={blog.user.image} height={20} width={20} />
                </div>
                <span className="truncate text-sm">{blog.user.name}</span>
              </div>

              <span className="text-xs text-gray-300 dark:text-gray-600">&bull;</span>
              <time className="truncate text-sm" dateTime={blog?.createdAt.toISOString()}>
                {blog.createdAt.toDateString()}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;
