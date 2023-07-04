import { DashboardHeader } from "@/components/Heading";
import getUsers from "../../actions/getUsers";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/DataTable";

const User = async () => {
  const users = await getUsers();
  return (
    <div className="grid items-start gap-8">
      <DashboardHeader heading="Users" text="Create and manage users"></DashboardHeader>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default User;
