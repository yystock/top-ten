import { notFound } from "next/navigation";

import { BlogForm } from "@/components/BlogForm";
import { db } from "@/lib/db";

interface BlogEditorPageProps {
  params: { blogId: string };
}

export default async function BlogEditorPage({ params }: BlogEditorPageProps) {
  const blog = await db.blog.findUnique({
    where: {
      id: params.blogId,
    },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <BlogForm blog={blog} />
    </div>
  );
}
