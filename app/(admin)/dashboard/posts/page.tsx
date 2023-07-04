import { DashboardHeader } from "@/components/Heading";

const PostsDashboard = async () => {
  return (
    <div className="grid items-start gap-8">
      <DashboardHeader heading="Posts" text="Create and manage Posts"></DashboardHeader>
    </div>
  );
};

export default PostsDashboard;
