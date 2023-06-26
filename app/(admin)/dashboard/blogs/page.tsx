import getBlogs from "../../actions/getBlogs";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/DataTable";
import Blogheader from "./blogheader";
const Blogs = async () => {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto h-full py-10">
      <Blogheader />
      <DataTable columns={columns} data={blogs} />
    </div>
  );
};

export default Blogs;
