import Feed from "./Feed";
import getPosts from "../../actions/getPosts";
import { getCurrentUser } from "@/lib/session";

export default async function Posts() {
  const currentUser = await getCurrentUser();
  const data = await getPosts();

  return (
    <div>
      <div className="sm:w-full md:w-3/5">
        <Feed data={data} currentUser={currentUser} />
      </div>
      <div className="sm:hidden md:w-2/5"></div>
    </div>
  );
}
