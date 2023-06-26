import { notFound } from "next/navigation";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";
import getBlogBySlug from "@/app/actions/getBlogBySlug";
import { cn } from "@/lib/utils";
import { BsArrowLeftShort } from "react-icons/bs";

interface BlogPageProps {
  params: {
    slug?: string;
  };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  console.log("blog--------", params);
  const blog = await getBlogBySlug(params);

  if (!blog) {
    return {};
  }
  return {
    title: blog.title,
    description: blog.content,

    openGraph: {
      title: blog.title,
      description: blog.content,
      type: "article",

      //   images: [
      //     {
      //     //   url: ogUrl.toString(),
      //       width: 1200,
      //       height: 630,
      //       alt: blog.title,
      //     },
      //   ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.content,
      //   images: [ogUrl.toString()],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlogBySlug(params);

  function createMarkup(content: string) {
    return { __html: content };
  }

  if (!blog) {
    notFound();
  }

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }), "absolute left-[-200px] top-14 hidden xl:inline-flex")}>
        <BsArrowLeftShort className="mr-2 h-4 w-4" />
        See all blogs
      </Link>
      <div>
        {blog.createdAt && (
          <time dateTime={blog.createdAt.toUTCString()} className="block text-sm text-muted-foreground">
            Published on {blog.createdAt.toISOString()}
          </time>
        )}
        <h1 className="font-heading mt-2 inline-block text-4xl leading-tight lg:text-5xl">{blog.title}</h1>
        {/* {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors.map((author) =>
              author ? (
                <Link key={author._id} href={`https://twitter.com/${author.twitter}`} className="flex items-center space-x-2 text-sm">
                  <Image src={author.avatar} alt={author.title} width={42} height={42} className="rounded-full bg-white" />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.title}</p>
                    <p className="text-[12px] text-muted-foreground">@{author.twitter}</p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : null} */}
      </div>
      {blog.imgSrc && (
        <Image src={blog.imgSrc} alt={blog.title} width={720} height={405} className="my-8 rounded-md border bg-muted transition-colors" priority />
      )}
      <div dangerouslySetInnerHTML={createMarkup(blog.content)} />
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <BsArrowLeftShort className="mr-2 h-4 w-4" />
          See all blogs
        </Link>
      </div>
    </article>
  );
}
