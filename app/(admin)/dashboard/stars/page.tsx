import getStars from "../../actions/getStars";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/DataTable";
import Starheader from "./starheader";
const Stars = async () => {
  const users = await getStars();

  return (
    <div className="container mx-auto h-full py-10">
      <Starheader />
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default Stars;
