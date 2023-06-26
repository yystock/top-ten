import { notFound, redirect } from "next/navigation";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { authOptions } from "@/lib/auth";
import getBlogById from "@/app/(admin)/actions/getBlogById";
import { Editor } from "@/app/components/Editor";

interface EditorPageProps {
  params: { blogId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const blog = await getBlogById(params.blogId, user.id);

  if (!blog) {
    notFound();
  }

  return (
    <Editor
      blog={{
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        imgSrc: blog.imgSrc,
        category: blog.category,
        content: blog.content,
        published: blog.published,
      }}
    />
  );
}
