import { DashboardHeader } from "@/components/Heading";
import getStars from "../../actions/getStars";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";

const StarsDashboard = async () => {
  const stars = await getStars();

  return (
    <div className="grid items-start gap-8">
      <DashboardHeader heading="Star" text="Create and manage top-10 stars">
        <Link className={cn("active: bg-blue-300", buttonVariants({ variant: "default" }))} href="/dashboard/stars/create">
          Add Star
        </Link>
      </DashboardHeader>
      <DataTable columns={columns} data={stars} />
    </div>
  );
};

export default StarsDashboard;
