import { buttonVariants } from "@/components/ui/Button";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface starheaderProps {}

const starheader: React.FC<starheaderProps> = () => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">Blog</h1>
        <p className="text-lg text-muted-foreground">Create and Manage Blog</p>
      </div>
      <div>
        <Link href="/dashboard/blogs/create" className={cn(buttonVariants({ variant: "default" }))}>
          Add Blog
        </Link>
      </div>
    </div>
  );
};

export default starheader;
