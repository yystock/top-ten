import getBlogs from "../../actions/getBlogs";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import Blogheader from "./blogheader";
const BlogsDashboard = async () => {
  const blogs = await getBlogs();

  return (
    <div className="grid items-start gap-8">
      <Blogheader />
      <DataTable columns={columns} data={blogs} />
    </div>
  );
};

export default BlogsDashboard;
