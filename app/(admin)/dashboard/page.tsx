import getUsers from "../actions/getUsers";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/DataTable";

const Dashboard = async () => {
  const users = await getUsers();
  return (
    <div className="container mx-auto h-full py-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default Dashboard;
